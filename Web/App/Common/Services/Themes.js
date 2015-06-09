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

            var req = {                
                method: 'GET',
                url : esqtvSettings.api + 'v1/themes?format=json' + encodeURI(searchQuery),
                transformResponse: function (data) {
                    
                    var themes = angular.fromJson(data);
                    themes.result.forEach(function(theme) {
                        theme["id"] = theme.id.replace('themes/', '');    
                    });
                    return themes;
                }
            };

            ajaxService.ajaxCustom(req, successFunction, errorFunction);
        }
    }]);
})();