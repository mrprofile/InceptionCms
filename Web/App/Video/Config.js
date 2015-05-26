(function () {
    'use strict';

    angular.module('esqtv.video').config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/videos', { templateUrl: '/App/Video/Views/Index.html', controller: 'VideoIndexCntrl', controllerAs: 'vm' })
            .when('/videos/edit/:videoId', {
                templateUrl: '/App/Video/Views/Edit.html', controller: 'VideoEditCntrl', controllerAs: 'vm',
                resolve: {
                    video: function ($route, VideoService) {
                        return VideoService.getVideo($route.current.params.videoId);
                    }
                }
            });
        $routeProvider.otherwise({ redirectTo: '/videos' });
        $locationProvider.html5Mode(true);
    });

    // Inject addTokenInterceptor for this moddule.
    angular.module('esqtv.video').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('addTokenInterceptor');
    }]);
})();