(function () {
    'use strict';
    angular.module('esqtv.common').service('GalleryService', function ($http, esqtvSettings) {

        var service = {
            get: getGallery,
            search: search,
            create: createGallery,
            update: createGallery
        };

        return service;

        function getGallery(id) {
            return $http.get(esqtvSettings.api + 'gallery/' + id)
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

            return $http.get(esqtvSettings.api + 'gallery/search?format=json' + encodeURI(searchQuery))
                 .then(function (data) {
                     if (data.status === 200) {
                         return data.data;
                     }

                     return [];
                 });
        };

        function createGallery(gallery) {            
            return $http.post(esqtvSettings.api + 'gallery/', gallery).then(function (resp) {
                return data.data;
            }, function (err) {
                console.log(err);
            });
        };

    });
})();