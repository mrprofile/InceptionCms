(function () {
    'use strict';
    angular.module('esqtv.common').directive('spinner', ['requestCountInterceptor', function (requestCountInterceptor) {
        return {
            restrict: 'EA',
            transclude: true,
            template: "<ng-transclude ng-show='requestCount'></ng-transclude>",
            scope: {},
            link: function (scope) {
                scope.$watch(function () {
                    return requestCountInterceptor.getRequestCount();
                }, function (requestCount) {
                    scope.requestCount = requestCount;
                });
            }
        };
    }]);
})();