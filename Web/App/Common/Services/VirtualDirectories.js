(function () {
    'use strict';
    angular.module('esqtv.common').service('VirtualDirectoryService', ['$http', 'esqtvSettings', function ($http, esqtvSettings) {

        var service = {
            getDirectories: getDirectories,
            search: search,
        };

        return service;

        function getDirectories(keys) {
            return $http.get(esqtvSettings.api + 'virtual-directory/' + keys + '?format=json')
                .then(function (data) {
                    if (data.status === 200) {
                        return data.data;
                    }

                    return [];
                });
        }

        function search(search, paging) {
            var searchQuery = '';


            searchQuery += '&limit=' + paging.itemsPerPage + '&offset=' + paging.currentPage;

            if (search.query != '') {
                searchQuery += '&query=' + search.query;
            }

            return $http.get(esqtvSettings.api + 'virtual-directory/search?format=json' + encodeURI(searchQuery))
                 .then(function (data) {
                     if (data.status === 200) {
                         return data.data;
                     }

                     return [];
                 });
        };

    }]);
})();