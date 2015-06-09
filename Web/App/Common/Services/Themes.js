(function () {
    'use strict';    
    angular.module('esqtv.common').service('ThemeService', ['$http', 'esqtvSettings', 'AjaxService', function ($http, esqtvSettings, ajaxService) {

        var service = {
            getTheme: getTheme,
            search: searchThemes
        };

        return service;

        function getTheme(id, successFunction, errorFunction) {

            ajaxService.ajaxGet(esqtvSettings.api + 'v1/themes/' + id + '?format=json', successFunction, errorFunction);
        }

        function searchThemes(search, paging, successFunction, errorFunction) {

            var searchQuery = '';
            searchQuery += '&limit=' + paging.itemsPerPage + '&offset=' + paging.currentPage;

            if (search.query != '') {
                searchQuery += '&query=' + search.query;
            }

            ajaxService.ajaxGet(esqtvSettings.api + 'v1/themes?format=json' + encodeURI(searchQuery), successFunction, errorFunction);
        }
    }]);
})();