(function () {
    'use strict';    
    angular.module('esqtv.common').service('VideoService', function ($http, esqtvSettings) {

        var service = {
            getVideo: getVideo,
            search: search,
            searchKeyword: searchKeyword
        };

        return service;

        function getVideo(videoId) {
            return $http.get(esqtvSettings.api + 'video/' + videoId + '?format=json')
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

            return $http.get(esqtvSettings.api + 'v1/video/search?format=json' + encodeURI(searchQuery))
                 .then(function (data) {
                     if (data.status === 200) {
                         return data.data;
                     }

                     return [];
                 });
        };

        function searchKeyword(search, paging) {
            if (search.query == '') {
                return;
            }

            var searchQuery = '';
            searchQuery += '&limit=' + paging.itemsPerPage + '&offset=' + paging.currentPage;

            if (search.query != '') {
                searchQuery += '&query=' + search.query;
            }

            return $http.get(esqtvSettings.api + 'video/related/keyword?format=json' + encodeURI(searchQuery))
                .then(function (data) {
                    if (data.status === 200) {
                        return data.data;
                    }

                    return [];
                });
        };

        function transformVideos(data, headersGetter, status) {
            console.log(data);

            return data;
        };

    });
})();