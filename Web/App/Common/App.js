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

    ////template: '<div class="video-search-container"><h4>{{keywordId.keywords}}</h4><div class="row"><ul class="col-md-12"><li class="video-item col-md-3 col-lg-2 col-sm-3" data-ng-repeat="video in videosList"><div class="image-container"><img class="img-responsive" data-ng-src="{{thumbnailUrl(video.ThumbnailUrl)}}" alt="{{title(video.Name)}}" /></div><p>{{title(video.Name)}}</p></li></ul></div></div>',
    angular.module("template/esqtv/videos/related.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/esqtv/videos/related.html",
        '<md-grid-list md-cols-sm="1" md-cols-md="2" md-cols-gt-md="6" md-row-height-gt-md="1:1" md-row-height="2:2" md-gutter="12px" md-gutter-gt-sm="8px">\n' + 
          '<md-grid-tile data-ng-repeat="video in videosList">\n' +
            '<img class="img-responsive" data-ng-src="{{thumbnailUrl(video.ThumbnailUrl)}}" alt="{{title(video.Name)}}" />\n' +
           '<md-grid-tile-footer>\n' +
               '<h3>{{title(video.Name)}}</h3>\n' +
           '</md-grid-tile-footer>\n' +
       '</md-grid-tile>\n' + '</md-grid-list>');
    }]);

    angular.module("template/esqtv/videos/preview.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/esqtv/videos/preview.html",
            '<md-content class=\"responsive-container\" flex><iframe class=\"responsive-video\" data-ng-src=\"{{embedUrl(video.embedUrl)}}\" frameborder=\"0\" >{{video.Name}}</iframe></md-content>'
            );
    }]);

    angular.module('esqtv.tpls', ['template/esqtv/videos/related.html','template/esqtv/videos/preview.html']);

    angular.module('esqtv.common', [ 'esqtv.tpls', 'ngRoute', 'ngCookies', 'ui.bootstrap', 'ngAnimate', 'toaster', 'ngMaterial', 'ui.select', 'ui.sortable', 'ng-mfb'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('indigo')
          .accentPalette('grey');
    })
    .config(function ($mdIconProvider){
        $mdIconProvider
            .iconSet('content', '/Content/style/css/svg-sprite-content.svg', 24);
    });
})();