(function() {
    'use strict';

    angular.module('esqtv.theme').controller("ThemeIndexCntrl", ['SearchService', 'ThemeService', 'NotifierService', themeCntrl]);
    
    function themeCntrl(searchService, themeService, notifierService) {
        var vm = this;

        vm.ss = searchService;
        vm.deleteItem = deleteItem;
        vm.ss.paging.onSelectPage = searchThemes;
        vm.searchThemes = function () {
            vm.ss.paging.currentPage = 1;
            searchThemes();
        };
        vm.selectItem = selectedItem;

        activate();
        
        function activate() {
            searchThemes();
        }
        
        function searchThemes() {
            themeService.search(vm.ss.search, vm.ss.paging, searchThemesCompleted, searchThemesError);
        }

        function searchThemesCompleted(response) {
            vm.ss.search.results = response.result;
            vm.ss.paging.totalItems = response.totalItems;
        }
        
        function deleteItem(id) {
            var count = 0;
            vm.ss.search.results.forEach(function (item) {
                if (item["id"] === id) {
                    vm.ss.search.results.splice(count, 1);
                    count++;
                }
            });
        }

        function searchThemesError() {
            notifierService.notifyDanger("Something went wrong with the search!");
        }
        
        function selectedItem(item) {
            console.log(item);
            alert('redirect to edit page');
        }
    };
})();