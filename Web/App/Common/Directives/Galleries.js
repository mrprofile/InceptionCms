(function () {
    'use strict';
    angular.module('esqtv.common').directive('gallerySearch', ['esqtvSettings', function (esqtvSettings) {
        return {
            restrict: 'E',
            controller: ['$scope', 'GalleryService', function ($scope, galleryService) {
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

                        search();                        
                    }
                };

                vm.searchFunc = function () {
                    vm.paging.currentPage = 1;
                    search();
                }
                vm.title = "Galleries";
                vm.imgUrl = function (slug) {
                    return "http://tv.esquire.com/images/" + slug + "?w=124";
                };
                activate();

                function activate() {
                    search();
                };

                function selectItem(itm) {


                    itm.id = itm.Video_Key ? itm.Video_Key : itm.ObjectKey;
                    //itm.embedUrl = itm.ValuesDict.videoEmbed[0];
                    //itm.source = "esquireTv";
                    vm.selectedItem = itm;
                    $scope.$emit('esqtv:common:gallery:select', itm);
                }

                function search() {
                    galleryService.search(vm.search, vm.paging)
                    .then(function (data) {
                        vm.search.results = data.Result;
                        vm.paging.totalItems = data.TotalItems;
                    });
                }
            }],
            controllerAs: 'vm',
            templateUrl: esqtvSettings.cms + '/App/Common/Views/GallerySearch.html',
            bindToController: true,
            scope: {
                'selectedItem': '='
            }
        };
    }]);
})();