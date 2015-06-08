(function () {
    'use strict';    
    angular.module('esqtv.common').service('VideoService', ['$http', 'esqtvSettings', 'AjaxService', function ($http, esqtvSettings, ajaxService) {

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

        function search(search, paging, successFunction, errorFunction) {

            var searchQuery = '';
            searchQuery += '&limit=' + paging.itemsPerPage + '&offset=' + paging.currentPage;

            if (search.query != '') {
                searchQuery += '&query=' + search.query;
            }

            ajaxService.ajaxGet(esqtvSettings.api + 'v1/video/search?format=json' + encodeURI(searchQuery), successFunction, errorFunction);
        }

        function searchKeyword(search, paging, successFunction, errorFunction) {
            if (search.query == '') {
                return;
            }

            var searchQuery = '';
            searchQuery += '&limit=' + paging.itemsPerPage + '&offset=' + paging.currentPage;

            if (search.query != '') {
                searchQuery += '&query=' + search.query;
            }
            
            ajaxService.ajaxGet(esqtvSettings.api + 'video/related/keyword?format=json' + encodeURI(searchQuery), successFunction, errorFunction);
        }
    }]);
})();