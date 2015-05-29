/// <reference path="../Views/Edit.html" />
'use strict';

angular.module('esqtv.pages').controller("PageEditCntrl", ['$scope', '$sce', '$http', '$q', '$mdSidenav', '$routeParams', '$window', '$location', 'page', 'KeywordService', 'pageComponent', 'PageService', pageEditCntrl]);

function pageEditCntrl($scope, $sce, $http, $q, $mdSidenav, $routeParams, $window, $location, page, KeywordService, pageComponent, PageService) {
    var vm = this;

    // Page related items
    vm.page = page;
    vm.template = [];
    
    vm.keywords = [];
    vm.searchKeywordText = '';
    vm.searchKeywords = searchKeywords;
    vm.save = save;
    vm.publish = publish;
    vm.remove = remove;
    vm.addComponent = addComponent;

    activate();

    vm.components = ['heading', 'text', 'image', 'gallery', 'video', 'videoList', 'embed'];

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

        console.log(JSON.stringify(vm.pageObject));

        PageService.update(vm.page).then(function (data) {
            console.log(data);
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