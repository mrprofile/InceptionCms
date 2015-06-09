; (function () {
    'use strict';

    angular.module('esqtv.slider').config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/sliders', {
                templateUrl: '/App/Slider/Views/Index.html',
                controller: 'SlideIndexCntrl',
                controllerAs: 'vm',
                resolve: {
                    sliders: function ($http, esqtvSettings) {
                        return $http.get(esqtvSettings.api + 'v1/sliders');
                    }
                }
            })
            //.when('/slider/create', {
            //    templateUrl: '/App/Slider/Views/Edit.html',
            //    controller: 'PageEditCntrl',
            //    controllerAs: 'vm',
            //    resolve: {
            //        page: function ($route, PageService) {
            //            return {
            //                "id": "",
            //                "title": "",
            //                "permaLink": "",
            //                "publishDate": moment().format(),//2015-04-16T15:52:12.6951395
            //                "expirationDate": moment().format(),
            //                "modifiedDate": moment().format(),
            //                "createdDate": moment().format(),
            //                "contentParts": []
            //            }
            //        }
            //    }
            //})
            .when('/sliders/edit/:id', {
                templateUrl: '/App/Slider/Views/Edit.html', controller: 'SlideEditCntrl', controllerAs: 'vm',
                resolve: {
                    slide: function ($route, $http, SliderService) {
                        return SliderService.get($route.current.params.id);
                    }
                }
            });
        //$routeProvider.otherwise({ redirectTo: '/pages' });
        //$locationProvider.html5Mode(true);
    });

    // Inject addTokenInterceptor for this moddule.
    //angular.module('esqtv.pages').config(['$httpProvider', function ($httpProvider) {
    //    $httpProvider.interceptors.push('addTokenInterceptor');
    //}]);
})();