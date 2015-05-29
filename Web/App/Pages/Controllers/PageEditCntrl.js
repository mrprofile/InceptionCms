/// <reference path="../Views/Edit.html" />
'use strict';

angular.module('esqtv.pages').controller("PageEditCntrl", ['$scope', '$sce', '$http', '$q', '$mdSidenav', '$routeParams', '$window', '$location', 'page', 'KeywordService', 'pageComponent', pageEditCntrl]);

function pageEditCntrl($scope, $sce, $http, $q, $mdSidenav, $routeParams, $window, $location, page, KeywordService, pageComponent) {
    var vm = this;

    // Page related items
    vm.page = page;
    vm.template = [];
    
    vm.keywords = [];
    vm.searchKeywordText = '';
    vm.searchKeywords = searchKeywords;
    vm.save = save;
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

    function save() {
        console.log(vm.page);
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