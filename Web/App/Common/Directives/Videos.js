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
                    //itm.embedUrl = itm.ValuesDict.videoEmbed[0];
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
})();