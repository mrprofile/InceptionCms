(function () {
    'use strict';
    angular.module('esqtv.common').directive('videoSearch', ['esqtvSettings', function (esqtvSettings) {
        return {
            restrict: 'E',
            controller: ['$scope', 'VideoService', 'SearchService', function ($scope, VideoService, searchService) {
                var vm = this;
                vm.searchService = searchService;
                vm.searchService.paging.onSelectPage = searchVideos;
                vm.selectItem = selectItem;
                vm.searchVideos = function() {
                    vm.searchService.paging.currentPage = 1;
                    searchVideos();
                };
                vm.title = "Videos";
                vm.imgUrl = function (slug) {
                    return "http://tv.esquire.com/images/" + slug + "?w=124";
                };
                activate();

                function activate() {
                    searchVideos();
                };

                function selectItem(itm) {
                    itm.id = itm.Video_Key ? itm.Video_Key : itm.objectKey;
                    itm.embedUrl = itm.valuesDict.videoEmbed[0];
                    vm.selectedVideo = itm;
                    $scope.$emit('esqtv:common:video:select', itm);
                }

                function searchVideos() {
                    VideoService.search(vm.searchService.search, vm.searchService.paging, searchVideosCompleted, searchVideosError);
                }

                function searchVideosCompleted(response) {
                    vm.searchService.search.results = response.result;
                    vm.searchService.paging.totalItems = response.totalItems;
                }
                
                function searchVideosError(response) {
                   //TODO: Call Notify Service
                }
            }],
            controllerAs: 'vm',
            templateUrl: esqtvSettings.cms + '/App/Common/Views/VideoSearch.html',
            bindToController: true,
            scope: {
                'selectedVideo': '=',
                'itemsPerPage': '@'
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
                VideoService.searchKeyword({ query: $scope.keywordId.keywords }, { itemsPerPage: parseInt(newValue, 10), currentPage: 0 }, searchKeywordCompleted, searchKeywordError);

                $scope.$watch('itemCount', function (newValue, oldValue) {
                    if (oldValue != newValue) {
                        VideoService.searchKeyword({ query: $scope.keywordId.keywords }, { itemsPerPage: parseInt(newValue, 10), currentPage: 0 }, searchKeywordCompleted, searchKeywordError);
                    }
                })

                $scope.$watch('keywordId.keywords', function (newValue, oldValue) {
                    if (oldValue != newValue) {
                        VideoService.searchKeyword({ query: $scope.keywordId.keywords }, { itemsPerPage: parseInt(newValue, 10), currentPage: 0 }, searchKeywordCompleted, searchKeywordError);
                    }
                })

                function searchKeywordCompleted(response) {
                    $scope.videosList = response.result;
                }
                
                function searchKeywordError(response) {
                    //TODO: Display TO USER
                }

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