/// <reference path="../Views/Edit.html" />
'use strict';

angular.module('esqtv.pages').controller("PageEditCntrl", ['$scope', '$sce', '$http', '$q', '$mdDialog', '$routeParams', '$window', '$location', 'page', 'KeywordService', 'pageComponent', 'PageService', pageEditCntrl]);

function pageEditCntrl($scope, $sce, $http, $q, $mdDialog, $routeParams, $window, $location, page, KeywordService, pageComponent, PageService) {
    var vm = this;

    // Page related items
    vm.page = page;
    vm.template = [];
    vm.toolbar = "/App/Pages/Views/EditToolbar.html";

    vm.keywords = [];
    vm.searchKeywordText = '';
    vm.searchKeywords = searchKeywords;
    vm.save = save;
    vm.publish = publish;
    vm.sort = sort;
    vm.remove = remove;
    vm.add = add;
    vm.addComponent = addComponent;

    activate();

    vm.components = ['heading', 'text', 'image', 'gallery', 'video', 'videoList', 'embed'];

    function add($event) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            template:
                '<md-dialog aria-label="Components List Dialog">' +
                '  <md-dialog-content>' +
                '   <md-subheader class="md-primary">Add A Component</md-subheader>' +
               '    <md-list>' +
               '      <md-list-item ng-click="add(item)" ng-repeat="item in items">' +
               '       <p>{{item}}</p>' +
               '       <md-divider ng-if="!$last"></md-divider>' +
               '    </md-list-item></md-list>' +
               '  </md-dialog-content>' +
               '  <div class="md-actions">' +
               '    <md-button ng-click="closeDialog()" class="md-primary">' +
               '      Done' +
               '    </md-button>' +
               '  </div>' +
               '</md-dialog>',
            locals: {
                items: vm.components,
                templates: vm.template
            },
            controller: DialogController
        });

        function DialogController(scope, $mdDialog, pageComponent, items, templates) {
            scope.items = items;
            scope.add = function (itm) {
                templates.push(pageComponent.create(itm));
            }
            scope.closeDialog = function () {
                $mdDialog.hide();
            }
        }
    }
    
    function sort($event) {        
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            template:
                '<md-dialog aria-label="List dialog">' +
                '  <md-dialog-content>' +
                '   <md-subheader class="md-primary">Re-order Components</md-subheader>' +
               '    <md-list ui-sortable ng-model="items">' +
               '      <md-list-item ng-repeat="item in items">' +
               '       <p>{{item.contentType}}</p>' +
               '       <md-divider ng-if="!$last"></md-divider>' +
               '    </md-list-item></md-list>' +
               '  </md-dialog-content>' +
               '  <div class="md-actions">' +
               '    <md-button ng-click="closeDialog()" class="md-primary">' +
               '      Done' +
               '    </md-button>' +
               '  </div>' +
               '</md-dialog>',
            locals: {
                items: vm.template
            },
            controller: DialogController
        });

        function DialogController(scope, $mdDialog, items) {
            scope.items = items;
            scope.closeDialog = function () {
                $mdDialog.hide();
            }
        }
    }

    function activate() {
        vm.page.contentParts.forEach(function (itm, idx) {
            if (itm.contentType == 'videoList') {
                itm.data.itemCount = parseInt(itm.data.itemCount, 10);
            }
            vm.template.push(itm);
        });
    }

    function publish() {
        PageService.publish(vm.page.id).then(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    }

    function save() {
        console.log(vm.page);

        vm.page.contentParts = [];
        vm.template.forEach(function (itm, idx) {
            vm.page.contentParts.push(itm);
        });

        console.log(JSON.stringify(vm.page));

        PageService.update(vm.page).then(function (result) {
            console.log(result);

        }, function (err) {
            console.log(err);
        });
    }

    function addComponent(componentType, $evt) {
        vm.template.push(pageComponent.create(componentType));
    };

    function remove(itm) {
        var idx = vm.template.indexOf(itm);
        if (idx !== -1) {
            vm.template.splice(idx, 1);
        }

    }

    function searchKeywords(keyword) {

        return KeywordService.search({ 'query': keyword }, { itemsPerPage: 24, currentPage: 0 }).then(function (response) {
            return response.Result;
        });
    }
}