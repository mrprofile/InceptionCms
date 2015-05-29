'use strict';

angular.module('esqtv.gallery').controller("GalleryIndexCntrl", ['$scope', '$sce', '$http', '$q', '$routeParams', '$window', '$location', galleryIndexCntrl]);

function galleryIndexCntrl($scope, $sce, $http, $q, $routeParams, $window, $location) {
    var vm = this;

    vm.selectedVideo = {};

    $scope.$on('esqtv:common:gallery:select', function (evt, itm) {
        vm.selectedVideo = itm;
        $location.path('/galleries/edit/' + itm.Gallery_Id);
    });
}