(function () {
    'use strict';
    angular.module('esqtv.common').directive('videoSearch', ['esqtvSettings', function (esqtvSettings) {
        return {
            restrict: 'E',
            controller: ['$scope', 'VideoService', function ($scope, VideoService) {
                var vm = this;
                vm.selectItem = selectItem;
                vm.search = {
                    query: '',
                    results: [],
                    clear: function () {
                        this.query = '';
                    }
                };

                vm.paging = {
                    numPages: 10,
                    totalItems: 0,
                    currentPage: 1,
                    itemsPerPage: 12,
                    onSelectPage: function () {

                        searchVideos();
                        //this.currentPage = page;
                        //searchVideos();
                    }
                };

                vm.searchVideos = function () {
                    vm.paging.currentPage = 1;
                    searchVideos();
                }
                vm.title = "Videos";
                vm.imgUrl = function (slug) {
                    return "http://tv.esquire.com/images/" + slug + "?w=124";
                };
                activate();

                function activate() {
                    searchVideos();
                };

                function selectItem(itm) {
                    
                    
                    itm.id = itm.Video_Key ? itm.Video_Key : itm.ObjectKey;
                    itm.embedUrl = itm.ValuesDict.videoEmbed[0];
                    //itm.source = "esquireTv";
                    vm.selectedVideo = itm;
                    $scope.$emit('esqtv:common:video:select', itm);
                }

                function searchVideos() {
                    VideoService.search(vm.search, vm.paging)
                    .then(function (data) {
                        vm.search.results = data.Result;
                        vm.paging.totalItems = data.TotalItems;
                    });
                }
            }],
            controllerAs: 'vm',
            templateUrl: esqtvSettings.cms + '/App/Common/Views/VideoSearch.html',
            bindToController: true,
            scope: {
                'selectedVideo': '='
            }
        };
    }]);

    angular.module('esqtv.common').directive('videoList', ['esqtvSettings', 'VideoService', function (esqtvSettings, VideoService) {
        return {
            restrict: 'E',
            scope: {
                'keywordId': '=',
                'itemCount': '='
            },
            templateUrl: "template/esqtv/videos/related.html",
            //template: '<div class="video-search-container"><h4>{{keywordId.keywords}}</h4><div class="row"><ul class="col-md-12"><li class="video-item col-md-3 col-lg-2 col-sm-3" data-ng-repeat="video in videosList"><div class="image-container"><img class="img-responsive" data-ng-src="{{thumbnailUrl(video.ThumbnailUrl)}}" alt="{{title(video.Name)}}" /></div><p>{{title(video.Name)}}</p></li></ul></div></div>',
            link: function ($scope, el, attr) {
                $scope.videosList = [];
                $scope.thumbnailUrl = thumbnailUrl;
                $scope.title = title;
                VideoService.searchKeyword({ query: $scope.keywordId.keywords }, { itemsPerPage: parseInt($scope.itemCount, 10), currentPage: 0 }).then(function (data) {
                    $scope.videosList = data.Result;
                });

                $scope.$watch('itemCount', function (newValue, oldValue) {
                    if (oldValue != newValue) {
                        VideoService.searchKeyword({ query: $scope.keywordId.keywords }, { itemsPerPage: parseInt(newValue, 10), currentPage: 0 }).then(function (data) {
                            $scope.videosList = data.Result;
                        });
                    }
                })

                $scope.$watch('keywordId.keywords', function (newValue, oldValue) {
                    if (oldValue != newValue) {
                        VideoService.searchKeyword({ query: newValue }, { itemsPerPage: parseInt($scope.itemCount, 10), currentPage: 0 }).then(function (data) {
                            $scope.videosList = data.Result;
                        });
                    }
                })



                function title(videoTitle) {
                    return videoTitle;
                }

                function thumbnailUrl(url) {
                    return 'http://tv.esquire.com/images/' + url;
                }
            }
        };
    }]);

    angular.module('esqtv.common').directive('entVideoPreview', ['esqtvSettings', 'VideoService', function (esqtvSettings, VideoService) {
        return {
            restrict: 'E',
            scope: {
                'video': '='
            },
            controller: ['$scope', '$sce', function ($scope, $sce) {
                $scope.embedUrl = embedUrl;

                function embedUrl() {

                    var urlToSanitize = $scope.video.embedUrl ? $scope.video.embedUrl : $scope.video.ValuesDict.videoEmbed[0];

                    return $sce.trustAsResourceUrl(urlToSanitize);
                };
            }],
            templateUrl: "template/esqtv/videos/preview.html",
            link: function (scope, el, attr) {
                console.log(scope.video);

                
            }
        }
    }]);
})();