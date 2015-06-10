;(function () {
    'use strict';

    angular.module('esqtv.video').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/videos', { templateUrl: '/App/Video/Views/Index.html', controller: 'VideoIndexCntrl', controllerAs: 'vm' })
            .when('/videos/edit/:videoId', {
                templateUrl: '/App/Video/Views/Edit.html', controller: 'VideoEditCntrl', controllerAs: 'vm',
                resolve: {
                    video: ['$route', 'VideoService', function ($route, videoService) {
                        return videoService.getVideo($route.current.params.videoId);
                    }]
                }
            });
    }]);

    angular.module('esqtv.video').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('addTokenInterceptor');
    }]);
})();