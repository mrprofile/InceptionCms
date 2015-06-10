;(function () {
    'use strict';

    angular.module('esqtv.pages').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/pages', {
                templateUrl: '/App/Pages/Views/Index.html',
                controller: 'PageIndexCntrl',
                controllerAs: 'vm'
            })
            .when('/pages/create', {
                templateUrl: '/App/Pages/Views/Edit.html',
                controller: 'PageEditCntrl',
                controllerAs: 'vm',
                resolve: {
                    page: function () {
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
                    page: ['$route', 'PageService', function ($route, pageService) {
                        return pageService.get($route.current.params.id);
                    }]
                }
            });
    }]);

    angular.module('esqtv.pages').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('addTokenInterceptor');
    }]);
})();