// This is the main entry point of the app. All modules regarding the CMS should be registered here.
(function () {
    'use strict';
    
    angular.module('esqtv.cms', ['esqtv.pages', 'esqtv.video', 'esqtv.theme', 'esqtv.slider']).config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
    });
})();