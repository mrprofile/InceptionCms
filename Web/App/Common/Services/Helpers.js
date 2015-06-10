; (function () {
    'use strict';
    angular.module('esqtv.common').service('esqtvDeleteService', ['$http', 'esqtvSettings', function ($http, esqtvSettings) {

        return {
            'page': deletePage,
            'theme': deleteTheme,
        };

        function deletePage(id) {
            return $http.delete(esqtvSettings.api + 'v1/contentpages/' + id);
        }

        function deleteTheme(id) {
            return $http.delete(esqtvSettings.api + 'v1/themes/' + id);
        }
    }]);
})();