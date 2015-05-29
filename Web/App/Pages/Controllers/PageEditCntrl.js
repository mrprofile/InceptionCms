/// <reference path="../Views/Edit.html" />
'use strict';

angular.module('esqtv.pages').controller("PageEditCntrl", ['$scope', '$sce', '$http', '$q', '$mdSidenav', '$routeParams', '$window', '$location', 'page', 'KeywordService', pageEditCntrl]);

function pageEditCntrl($scope, $sce, $http, $q, $mdSidenav, $routeParams, $window, $location, page, KeywordService) {
    var vm = this;

    // Page related items
    vm.page = page;
    vm.template = [];
    
    vm.keywords = [];
    vm.searchKeywordText = '';
    vm.searchKeywords = searchKeywords;
    vm.save = save;
    activate();

    function activate() {
        vm.page.contentParts.forEach(function (itm, idx) {
            if (itm.contentType == 'videoList') {
                itm.data.itemCount = parseInt(itm.data.itemCount, 10);
            }
            vm.template.push(itm);
        });
    }

    function save() {
        $mdSidenav('left').toggle();
    }

    function searchKeywords(keyword) {

        return KeywordService.search({ 'query': keyword }, { itemsPerPage: 24, currentPage: 0 }).then(function (response) {
            return response.Result;
        });
    }
}