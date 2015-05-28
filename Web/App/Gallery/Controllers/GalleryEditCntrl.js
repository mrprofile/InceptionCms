'use strict';

angular.module('esqtv.gallery').controller("GalleryEditCntrl", ['$scope', '$sce', '$http', '$q', '$mdSidenav', '$routeParams', '$window', '$location', 'gallery', 'KeywordService', galleryEditCntrl]);

function galleryEditCntrl($scope, $sce, $http, $q, $mdSidenav, $routeParams, $window, $location, gallery, KeywordService) {
    var vm = this;

    vm.gallery = gallery;
    vm.keywords = [];
    vm.searchKeywordText = '';
    vm.searchKeywords = searchKeywords;
    vm.save = save;
    activate();

    function activate() {
        if (vm.gallery.GalleryKeywords.length > 0) {            
            var keys = vm.gallery.GalleryKeywords;
            KeywordService.getKeywords(keys).then(function (resp) {
                vm.keywords = resp.Result;
            });
        }        
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