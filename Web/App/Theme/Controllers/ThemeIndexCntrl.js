(function() {
    'use strict';

    angular.module('esqtv.theme').controller("ThemeIndexCntrl", ['SearchService', 'ThemeService', themeCntrl]);
    
    function themeCntrl(searchService, themeService) {
        var vm = this;

        vm.ss = searchService;
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
            console.log(response);
            vm.ss.search.results = response.result;
            vm.ss.paging.totalItems = response.totalItems;
        }

        function searchThemesError(response) {
            //TODO: Call Notify Service
        }
        
        function selectedItem(item) {
            console.log(item);
            alert('redirect to edit page');
        }
    };
})();