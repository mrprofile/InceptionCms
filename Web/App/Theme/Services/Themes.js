(function () {
    'use strict';    
    angular.module('esqtv.common').service('ThemeService', ['$http', 'esqtvSettings', 'AjaxService', function ($http, esqtvSettings, ajaxService) {

        var service = {
            getTheme: getTheme,
            search: searchThemes,
            publish: publish,
            update: update,
            create: create
        };

        return service;
        
        function publish(themeId, successFunction, errorFunction) {
            ajaxService.ajaxPost(esqtvSettings.api + "v1/publish", { "Type": "themes", "Id": themeId }, successFunction, errorFunction);
        }

        function update(theme, successFunction, errorFunction) {
            ajaxService.ajaxPut((esqtvSettings.api + 'v1/themes/' + theme.id, theme), successFunction, errorFunction);
        }

        function create(theme, successFunction, errorFunction) {
            ajaxService.ajaxPost(esqtvSettings.api + 'v1/themes', theme, successFunction, errorFunction);
        }

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