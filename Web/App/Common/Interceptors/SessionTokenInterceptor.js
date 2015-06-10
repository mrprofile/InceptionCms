(function () {
    'use strict';
    var commonModule = angular.module('esqtv.common');

    commonModule.factory('addTokenInterceptor', ['$q', '$cookies', '$window', addTokenInterceptor]);
    
    function addTokenInterceptor($q, $cookies, $window) {

        var request = {

            request: function (config) {
                var session = $cookies['X-ESQTV-SID'];
                
                if (session != null && session !== 'undefined') 
                    config.headers['X-ESQTV-SID'] = session;
                else
                    $window.location.href = '/logoff';
                
                return $q.when(config);
            }
        };
        
        return request;
    }
})();