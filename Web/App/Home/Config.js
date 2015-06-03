(function () {
    'use strict';

    angular.module('esqtv.home').config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', { templateUrl: '/App/Home/Views/Index.html', controller: 'HomeIndexCntrl', controllerAs: 'vm' });
        $routeProvider.otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
    });

    // Inject addTokenInterceptor for this moddule.
    angular.module('esqtv.home').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('addTokenInterceptor');
    }]);
})();