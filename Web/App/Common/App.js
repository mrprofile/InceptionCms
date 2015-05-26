(function () {
    'use strict';

    angular.module('esqtv.common', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngAnimate', 'toaster', 'ngMaterial', 'ui.select'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('blue-grey')
          .accentPalette('orange');
    });
})();