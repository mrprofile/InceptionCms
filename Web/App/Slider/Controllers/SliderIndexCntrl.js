; (function () {
    'use strict';
    angular.module('esqtv.slider').controller('SlideIndexCntrl', ['$scope', '$location', 'sliders', function ($scope, $location, sliders) {
        var vm = this;

        vm.parseId = parseId;
        vm.selectItem = selectItem;
        vm.search = {
            query: '',
            results: sliders.data.Result,
            clear: function () {
                this.query = '';
            }
        };

        vm.paging = {
            numPages: 5,
            totalItems: 0,
            currentPage: 1,
            itemsPerPage: 12,
            onSelectPage: function () {

                searchPages();
            }
        };

        activate();

        function activate() {
            //searchPages();
        }

        function parseId(ravenId) {
            return ravenId.replace('sliders/', '');
        }

        vm.searchPages = function (page) {
            vm.paging.currentPage = page ? page : 1;
            searchPages();
        };

        function searchPages() {
            pageService.search(vm.search, vm.paging)
                        .then(function (data) {
                            vm.search.results = data.result;
                            vm.paging.totalItems = data.totalItems;
                        });
        }

        vm.selectedVideo = {};

        function selectItem(itm) {
            $location.path('/sliders/edit/' + parseId(itm.Id));
        }

        $scope.$on('esqtv:common:slider:select', function (evt, itm) {
            vm.selectedVideo = itm;
            $location.path('/sliders/edit/' + parseId(itm.Id));
        });
    }]);
})();