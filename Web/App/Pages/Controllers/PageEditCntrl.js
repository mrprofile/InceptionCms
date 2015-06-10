/// <reference path="../Views/Edit.html" />
;(function () {

'use strict';

angular.module('esqtv.pages').controller("PageEditCntrl", ['$route', '$scope', '$sce', '$http', '$q', '$mdDialog', '$routeParams', '$window', '$location', 'page', 'KeywordService', 'pageComponent', 'PageService', 'NotifierService', pageEditCntrl]);

function pageEditCntrl($route, $scope, $sce, $http, $q, $mdDialog, $routeParams, $window, $location, page, keywordService, pageComponent, pageService, notifierService) {
    var vm = this;
    vm.isEdit = ($window.location.href.indexOf('edit') > 0);
    // Page related items
    vm.page = page;
    vm.layout = 'layout-default';
    vm.template = [];
    vm.toolbar = "/App/Pages/Views/EditToolbar.html";

    vm.keywords = [];
    vm.searchKeywordText = '';
    vm.searchKeywords = searchKeywords;
    vm.save = save;
    vm.deleteRecord = deleteRecord;
    vm.publish = publish;
    vm.sort = sort;
    vm.remove = remove;
    vm.add = add;
    vm.addComponent = addComponent;
    vm.setDate = setDate;

    vm.confirmDelete = function (id) {

        console.log("deleted!" + id);

    }

    vm.cancelDelete = function () {

        console.log("cancelled!");

    }

    activate();

    vm.components = ['heading', 'text', 'image', 'gallery', 'video', 'videoList', 'embed'];

    function setDate($event, propName) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            parent: parentEl,
            targetEvent: $event,
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
                propertyName: propName
            }
        });

        function dialogController(scope, $mdDialog, propertyName) {

            scope.dateTime = vm.page[propertyName];
            scope.onTimeSet = function (newValue, oldValue) {                
                console.log(newValue);
                vm.page[propertyName] = newValue;
            }
            scope.closeDialog = function () {
                $mdDialog.hide();
            }
        }
    }

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
               '      <md-list-item ng-repeat="item in items"><div layout="row" layout-align="start center" >' +
               '       <md-icon md-font-icon="ion-drag"></md-icon><p>{{item.contentType}}</p>' +
               '        <md-icon md-font-icon="ion-trash-b" ng-click="remove(item)" aria-label="Remove Component" class="md-secondary md-hue-3"></md-icon></div>' +
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
            scope.remove = function (itm) {
                var idx = items.indexOf(itm);
                if (idx !== -1) {
                    items.splice(idx, 1);
                }
            }
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
        if (vm.isEdit) {
            pageService.publish(vm.page.id).then(function (data) {
                console.log(data);
                notifierService.notifySuccess('Record Published!');
            }, function (err) {
                console.log(err);
            });
        }
    }

    function deleteRecord(ev) {
        //DialogService.confirmDelete(ev, "OK", "CANCEL", alertDelete).then(function() {
            
        //}, function() {});
    }
    
    function alertDelete() {
        alert('delete record TODO hook up service');
    }

    function save() {
        console.log(vm.page);

        vm.page.layout = vm.layout;
        vm.page.contentParts = [];
        vm.template.forEach(function (itm, idx) {
            vm.page.contentParts.push(itm);
        });

        console.log(JSON.stringify(vm.page));
        if (vm.isEdit) {
            pageService.update(vm.page).then(function (result) {
                notifierService.notifySuccess('Record Saved!');

            }, function (err) {
                throw new Error(err.data.ResponseStatus.Message);
            });
        } else {
            pageService.create(vm.page).then(function (result) {
                var id = result.data.id;
                notifierService.notifySuccess('Record Created!');
                $location.url('/pages/edit/' + id);
            }, function (err) {
                console.log(err);
                throw new Error(err.data.ResponseStatus.Message);
            });
        }
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

        return keywordService.search({ 'query': keyword }, { itemsPerPage: 24, currentPage: 0 }).then(function (response) {
            return response.Result;
        });
    }
}

})();