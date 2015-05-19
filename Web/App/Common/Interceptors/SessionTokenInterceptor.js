(function () {
    'use strict';
    var commonModule = angular.module('esqtv.common');

    commonModule.factory('addTokenInterceptor', ['$q', '$cookies', addTokenInterceptor]);
    
    function addTokenInterceptor($q, $cookies) {

        var request = {

            request: function (config) {
                var session = $cookies['X-ESQTV-SID'];
                
                if (session != null && session !== 'undefined') 
                    config.headers['X-ESQTV-SID'] = session;

                return $q.when(config);
            }
        };
        
        return request;
    }
})();