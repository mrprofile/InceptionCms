; (function () {

    angular.module('esqtv.common').directive('mdTable', function () {
        return {
            restrict: 'E',
            scope: {
                headers: '=',
                content: '=',
                sortable: '=',
                filters: '=',
                customClass: '=customClass',
                thumbs: '=',
                count: '='
            },
            controller: ['$scope', '$filter', function($scope, $filter) {
                var orderBy = $filter('orderBy');
                $scope.tablePage = 0;
                $scope.nbOfPages = function() {
                    return Math.ceil($scope.content.length / $scope.count);
                },
                $scope.handleSort = function(field) {
                    if ($scope.sortable.indexOf(field) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                };
                $scope.order = function(predicate, reverse) {
                    $scope.content = orderBy($scope.content, predicate, reverse);
                    $scope.predicate = predicate;
                };
                //$scope.order($scope.sortable[0], false);
                $scope.getNumber = function(num) {
                    return new Array(num);
                };
                $scope.goToPage = function(page) {
                    $scope.tablePage = page;
                };
            }],
            templateUrl: '../Views/mdTable.html'
        };
    });

    angular.module('esqtv.common').directive('mdColresize', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$evalAsync(function () {
                    $timeout(function () {
                        $(element).colResizable({
                            liveDrag: true,
                            fixed: true

                        });
                    }, 100);
                });
            }
        }
    });

    angular.module('esqtv.common').filter('startFrom', function () {
        return function (input, start) {
            start = +start;
            return input.slice(start);
        }
    });

})();