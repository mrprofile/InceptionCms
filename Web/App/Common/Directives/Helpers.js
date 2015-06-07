(function () {
    'use strict';
    angular.module('esqtv.common').directive('entSearchBox', function () {
        return {
            restrict: 'E',
            scope: {
                search: "&",
                query: "=",
                buttontext: "@",
                labeltext: "@"
            },
            template: '<div layout="row" layout-align="start center">'+
                        '<md-input-container>'+
                            '<label>{{labeltext}}</label>' +
                            '<input type="text" data-ng-model="query" ent-enter action="search()" />' +
                        '</md-input-container>'+
                        '<md-button ng-click="search()" class="btn btn-primary">{{buttontext}}</md-button>' +
                      '</div>'
        };
    });
    
    angular.module('esqtv.common').directive('entEnter', function () {
        return {
            restrict: 'A',
            scope: {
                action: "&action"
            },
            link: function (scope, elements) {
                elements.bind('keydown keypress', function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(scope.action());
                        });
                        event.preventDefault();
                    }
                });
            }
        };  
    });

    angular.module('esqtv.common').directive('entButtonDelete', function() {
        return {
            restrict: 'E',
            scope: {                                
                confirm: "&",
                objectType: "@",
                objectId: "@"
            },
            controller: ['$scope', '$mdDialog', 'esqtvDeleteService', 'NotifierService', function ($scope, $mdDialog, esqtvDeleteService, notifierService) {

                var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('Are you sure you want to delete this record?')
                .content('This record will be permanently removed from the system.')
                .ariaLabel('Lucky day')
                .ok("Ok")
                .cancel("Cancel");

                $scope.action = function() {
                    $mdDialog.show(confirm).then(function() {

                        esqtvDeleteService[$scope.objectType]($scope.objectId).then(function() {
                            if ($scope.confirm !== 'undefined' && $scope.confirm != null) {
                                $scope.confirm();
                                notifierService.notifySuccess("Record Deleted!");
                            }
                        });
                    }, function() {
                    });
                };
            }],
            link: function(scope, elem) {
                elem.bind('click', scope.action);
            }
        };
    });
})();