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
                objectId: "@",
                urlRedirect: "@"
            },
            controller: ['$scope', '$mdDialog', '$location', 'esqtvDeleteService', 'NotifierService', function ($scope, $mdDialog, $location, esqtvDeleteService, notifierService) {

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
                                
                                if ($scope.urlRedirect !== 'undefined' && $scope.urlRedirect != null) {
                                    $location.url($scope.urlRedirect);
                                }
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

    // Iterates through each of the object's properties and displays them using un-ordered list.
    angular.module('esqtv.common').directive('esqtvDisplayObject', function () {
        return {
            restrict: 'EAC',
            scope: {
                model: "=",                
            },
            link: function(scope, element, attr) {

                scope.props = [];

                for (var key in scope.model) {
                    scope.props.push({"key": key, "value" : scope.model[key]})
                }

            },
            template: '<md-list>' +
                '<md-list-item data-ng-repeat="prop in props">' +
                '<p>{{prop.key}} : {{prop.value}}</p>' +
                '</md-list-item>' +
                '</md-list>'                      
        };
    });

    angular.module("esqtv.common").directive('esqtvDateTimePickerModal', function () {
        return {
            restrict: 'EAC',
            scope: {
                model: "=",
                propertyName: "@"
            },
            link: function(scope, elem, attr) {
                elem.bind('click', scope.showDialog);
            },
            //template: '<md-button ng-click="showDialog()">Set Date</md-button>',
            controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
                var parentEl = angular.element(document.body);
                var dialogConfig = {
                    clickOutsideToClose: true,
                    scope: $scope,
                    preserveScope: true,
                    parent: parentEl,
                    template:
                        '<md-dialog aria-label="Set Date/Time">' +
                        '  <md-dialog-content>' +
                        '   <md-subheader class="md-primary">Set Date</md-subheader>' +
                        '<datetimepicker data-ng-model="dateTime" data-on-set-time="onTimeSet(newDate, oldDate)" ></datetimepicker>' +
                       '  </md-dialog-content>' +
                       '  <div class="md-actions">' +
                       '    <md-button ng-click="closeDialog()" class="md-primary">' +
                       '      Done' +
                       '    </md-button>' +
                       '  </div>' +
                       '</md-dialog>',
                    controller: dialogController,
                    locals: {
                        propertyName: $scope.propertyName,                        
                    }
                }

                $scope.showDialog = function () {
                    $mdDialog.show(dialogConfig);
                };

                function dialogController(scope, $mdDialog, propertyName) {

                    scope.dateTime = $scope.model;
                    scope.onTimeSet = function (newValue, oldValue) {
                        console.log(newValue);
                        $scope.model = newValue;
                    }
                    scope.closeDialog = function () {
                        $mdDialog.hide();
                    }
                }
            }]
        }
    });
})();