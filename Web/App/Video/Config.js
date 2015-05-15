(function () {
    'use strict';

    angular.module('esqtv.video').config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/videos', { templateUrl: '/App/Video/Views/Index.html', controller: 'VideoIndexCntrl', controllerAs: 'vm' })
            .when('/videos/:videoId', {
                templateUrl: '/App/Video/Views/Edit.html', controller: 'VideoEditCntrl', controllerAs: 'vm',
                resolve:{ 
                    video: function ($route, VideoService) {                        
                        return VideoService.getVideo($route.current.params.videoId);
                    }
                }
            });
        $routeProvider.otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
    });
})();