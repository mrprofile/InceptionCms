(function () {
    'use strict';
    angular.module('esqtv.common').service('ImageService', ['$http', 'esqtvSettings', function ($http, esqtvSettings) {

        var service = {
            search: search
        };

        return service;

        function search(search, paging) {

            var searchQuery = '';
            searchQuery += '&limit=' + paging.itemsPerPage + '&offset=' + paging.currentPage;

            searchQuery += '&imagetypekey=' + search.imageType;

            if (search.query != '') {
                searchQuery += '&query=' + search.query;
            }

            return $http.get(esqtvSettings.api + 'images/search?format=json' + encodeURI(searchQuery))
                 .then(function (data) {
                     if (data.status === 200) {
                         return data.data;
                     }

                     return [];
                 });
        };
    }]);
})();