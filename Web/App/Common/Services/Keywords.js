(function () {
    'use strict';
    angular.module('esqtv.common').service('KeywordService', ['$http', 'esqtvSettings', function ($http, esqtvSettings) {

        var service = {
            getKeywords: getKeywords,
            search: searchKeyword,
        };

        return service;

        function getKeywords(keywordKeys) {
            return $http.get(esqtvSettings.api + 'keywords/' + keywordKeys + '?format=json')
                .then(function (data) {
                    if (data.status === 200) {
                        return data.data;
                    }

                    return [];
                });
        }

        function searchKeyword(search, paging) {
            var searchQuery = '';


            searchQuery += '&limit=' + paging.itemsPerPage + '&offset=' + paging.currentPage;

            if (search.query != '') {
                searchQuery += '&query=' + search.query;
            }

            return $http.get(esqtvSettings.api + 'keywords/search?format=json' + encodeURI(searchQuery))
                 .then(function (data) {
                     if (data.status === 200) {
                         return data.data;
                     }

                     return [];
                 });
        };

    }]);
})();