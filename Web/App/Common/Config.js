(function () {
    'use strict';

    // Inject decorated $exceptionHander with feature to log error to screen.
    // TODO: Catch errors to esqtv.logger webservice.
    angular.module('esqtv.common').config(function ($provide) {
        $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
            return function (exception, cause) {
                $delegate(exception, cause);
                
                var alertService = $injector.get("AlertService");
                alertService.addDanger('Oops! Something went wrong!', exception.message);
            };
        });
    });
    
    // Inject requestCountInterceptor for common moddule.
    angular.module('esqtv.common').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('requestCountInterceptor');
    }]);
})();