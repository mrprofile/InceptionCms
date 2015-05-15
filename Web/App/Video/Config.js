(function () {
    'use strict';

    var videoModule = angular.module('esqtv.video');

    // Configure Routes
    videoModule.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/videos', { templateUrl: '/App/Video/Views/Index.html', controller: 'VideoIndexCntrl' });
        $routeProvider.otherwise({ redirectTo: '/videos' });
        $locationProvider.html5Mode(true);
    });
})();