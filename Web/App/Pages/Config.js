;(function () {
    'use strict';

    angular.module('esqtv.pages').config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/pages', {
                templateUrl: '/App/Pages/Views/Index.html',
                controller: 'PageIndexCntrl',
                controllerAs: 'vm',
                resolve: {
                    pages: function (PageService) {
                        return PageService.search({ 'query': '' }, { itemsPerPage: 24, currentPage: 0 });
                    }
                }
            })
            .when('/pages/create', {
                templateUrl: '/App/Pages/Views/Edit.html',
                controller: 'PageEditCntrl',
                controllerAs: 'vm',
                resolve: {
                    page: function ($route, PageService) {
                        return {
                            "id": "",
                            "title": "",
                            "permaLink": "",
                            "publishDate": moment().format(),//2015-04-16T15:52:12.6951395
                            "expirationDate": moment().format(),
                            "modifiedDate": moment().format(),
                            "createdDate": moment().format(),
                            "contentParts": []
                        }
                    }
                }
            })
            .when('/pages/edit/:id', {
                templateUrl: '/App/Pages/Views/Edit.html', controller: 'PageEditCntrl', controllerAs: 'vm',
                resolve: {
                    page: function ($route, PageService) {
                        return PageService.get($route.current.params.id);
                    }
                }
            });
        $routeProvider.otherwise({ redirectTo: '/pages' });
        $locationProvider.html5Mode(true);
    });

    // Inject addTokenInterceptor for this moddule.
    angular.module('esqtv.pages').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('addTokenInterceptor');
    }]);
})();