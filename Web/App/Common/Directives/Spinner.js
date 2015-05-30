(function () {
    'use strict';
    angular.module('esqtv.common').directive('entSpinner', ['requestCountInterceptor', function (requestCountInterceptor) {
        return {
            restrict: 'EA',
            transclude: true,
            template: "<md-progress-linear class=\"md-primary md-hue-3\" style=\"position: fixed; top: -5px; left: 0; z-index:999;\"  ng-show='requestCount' md-mode=\"indeterminate\"></md-progress-linear>",
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