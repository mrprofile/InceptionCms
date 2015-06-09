(function () {
    'use strict';
    angular.module('esqtv.common').service('SliderService', function ($http, esqtvSettings) {

        var service = {
            get: getPage,
            search: search,
            publish: publish,
            update: update,
            create: create
        };

        return service;

        function getPage(id) {
            return $http.get(esqtvSettings.api + 'v1/sliders/' + id, {
                transformResponse: function (data, headersGetter, status) {
                    var _data = angular.fromJson(data);
                    _data["id"] = _data.Id.replace('sliders/', '');                    
                    return _data;
                }
            })
                .then(function (data) {
                    if (data.status === 200) {
                        return data.data;
                    }

                    return [];
                });
        };

        function search(search, paging) {

            var searchQuery = '';
            searchQuery += '&limit=' + paging.itemsPerPage + '&offset=' + paging.currentPage;

            if (search.query != '') {
                searchQuery += '&query=' + search.query;
            }

            return $http.get(esqtvSettings.api + 'v1/sliders?format=json' + encodeURI(searchQuery))
                 .then(function (data) {
                     if (data.status === 200) {
                         return data.data;
                     }

                     return [];
                 });
        };

        function publish(contentPageId) {
            return $http.post(esqtvSettings.api + "v1/publish", { "Type": "contentpage", "Id": contentPageId });
        }

        function update(contentPage) {
            return $http.put(esqtvSettings.api + 'v1/sliders/' + contentPage.id, contentPage);
        }

        function create(contentPage) {
            return $http.post(esqtvSettings.api + 'v1/sliders', contentPage);
        }

    });
})();