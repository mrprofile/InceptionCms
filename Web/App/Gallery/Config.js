(function () {
    'use strict';

    angular.module('esqtv.gallery').config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/galleries', { templateUrl: '/App/Gallery/Views/Index.html', controller: 'GalleryIndexCntrl', controllerAs: 'vm' })
            .when('/galleries/edit/:id', {
                templateUrl: '/App/Gallery/Views/Edit.html', controller: 'GalleryEditCntrl', controllerAs: 'vm',
                resolve: {
                    gallery: function ($route, GalleryService) {                        
                        return GalleryService.get($route.current.params.id);
                    }
                }
            });
        $routeProvider.otherwise({ redirectTo: '/galleries' });
        $locationProvider.html5Mode(true);
    });

    // Inject addTokenInterceptor for this moddule.
    angular.module('esqtv.gallery').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('addTokenInterceptor');
    }]);
})();