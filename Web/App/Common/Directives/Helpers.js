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

})();