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
            template: '<md-list-item layout="row">'+
                        '<md-input-container>'+
                            '<label>{{labeltext}}</label>' +
                            '<input type="text" data-ng-model="query" />' +
                        '</md-input-container>'+
                        '<md-button ng-click="search()" class="btn btn-primary"><i class="glyphicon glyphicon-search">{{buttontext}}</md-button>' +
                      '</md-list-item>'
        };
    });
})();