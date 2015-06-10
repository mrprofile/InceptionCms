(function () {
    'use strict';

    angular.module('esqtv.common').config(['$provide', function ($provide) {
        $provide.decorator("$exceptionHandler", ['$delegate', '$injector', function ($delegate, $injector) {
            return function (exception, cause) {
                $delegate(exception, cause);
                
                var notifier = $injector.get("NotifierService");
                notifier.notifyDanger('Oops! Something went wrong! \n\n' + exception.message);
            };
        }]);
    }]);    
    
    angular.module('esqtv.common').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('requestCountInterceptor');
    }]);
})();