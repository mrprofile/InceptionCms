(function () {
    'use strict';

    //override template for bootstrap pagination
    angular.module("template/pagination/pagination.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/pagination/pagination.html",
          "<ul class=\"pagination\">\n" +
          "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\"><md-button class=\"md-fab md-mini md-hue-1\" href ng-click=\"selectPage(1, $event)\">{{getText('first')}}</md-button></li>\n" +
          "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\"><md-button class=\"md-fab md-mini md-hue-1\" href ng-click=\"selectPage(page - 1, $event)\">{{getText('previous')}}</md-button></li>\n" +
          "  <li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\"><md-button class=\"md-fab md-mini md-no-theme \" ng-class=\"{'md-hue-3': page.active}\" href ng-click=\"selectPage(page.number, $event)\">{{page.text}}</md-button></li>\n" +
          "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\"><md-button class=\"md-fab md-mini md-hue-1\" href ng-click=\"selectPage(page + 1, $event)\">{{getText('next')}}</md-button></li>\n" +
          "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\"><md-button class=\"md-fab md-mini md-hue-1\" href ng-click=\"selectPage(totalPages, $event)\">{{getText('last')}}</md-button></li>\n" +
          "</ul>");
    }]);

    angular.module('esqtv.common', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngAnimate', 'toaster', 'ngMaterial', 'ui.select'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('blue-grey')
          .accentPalette('blue');
    });
})();