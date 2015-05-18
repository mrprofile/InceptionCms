(function () {
    'use strict';
    var commonModule = angular.module('esqtv.common');

    commonModule.factory('requestCountInterceptor', ['$q', requestCountInterceptor]);
    
    function requestCountInterceptor($q) {
        var requestCount = 0;
        
        var request = {

            request: function (config) {
                requestCount += 1;

                return $q.when(config);
            },
            requestError: function (error) {
                requestCount -= 1;

                return $q.reject(error);
            },
            response: function (response) {
                requestCount -= 1;

                return $q.when(response);
            },
            responseError: function (error) {
                requestCount -= 1;

                return $q.reject(error);
            },
            getRequestCount: function() {
                return requestCount;
            }
        };
        
        return request;
    }
})();