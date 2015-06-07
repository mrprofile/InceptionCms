; (function () {
    'use strict';
    angular.module('esqtv.common').service('esqtvDeleteService', ['$http', '$q', 'esqtvSettings', function ($http, $q, esqtvSettings) {

        return {
            'page': deletePage,
        }

        function deletePage(id) {

            return $q.when(id);
            //http call to delete
        }

    }]);
})();