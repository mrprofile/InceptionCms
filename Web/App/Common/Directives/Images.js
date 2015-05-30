(function () {
    'use strict';
    angular.module('esqtv.common').directive('imageSearch', ['esqtvSettings', function (esqtvSettings) {
        return {
            restrict: 'EA',            
            controller: ['$scope', 'ImageService', function ($scope, ImageService) {                
                var vm = this;
                vm.selectItem = selectItem;
                vm.search = {
                    imageType: $scope.imagetypekey ? $scope.imagetypekey : 31,
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
                    
                    vm.selectedItem.url = 'http://tv.esquire.com/images/' + itm.ImageCollection[0].URL;
                    vm.selectedItem.id = itm.ImageDB3_Key;
                    
                    $scope.$emit('esqtv:common:image:select', itm);
                }

                function searchVideos() {
                    ImageService.search(vm.search, vm.paging)
                    .then(function (data) {
                        vm.search.results = data.Result;
                        vm.paging.totalItems = data.TotalItems;
                    });
                }
            }],
            controllerAs: 'vm',
            templateUrl: esqtvSettings.cms + '/App/Common/Views/ImageSearch.html',
            bindToController: true,
            scope: {
                'selectedItem': '=',                
            },
            link: function (scope, element, attrs) {
                console.log(attrs.imagetypekey);
                scope.imagetypekey = attrs.imagetypekey;
            }
        };
    }]);

})();