;(function () {
    'use strict';

    angular.module('esqtv.theme').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/themes', { templateUrl: '/App/Theme/Views/Index.html', controller: 'ThemeIndexCntrl', controllerAs: 'vm' })
            .when('/themes/edit/:id', {
                templateUrl: '/App/Video/Views/Edit.html', controller: 'ThemeEditCntrl', controllerAs: 'vm'
            });
        
    }]);

    angular.module('esqtv.theme').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('addTokenInterceptor');
    }]);
})();