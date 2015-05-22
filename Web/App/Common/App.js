(function () {
    'use strict';

    angular.module('esqtv.common', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngAnimate', 'toaster', 'ngMaterial'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('blue-grey')
          .accentPalette('orange');
    });
})();