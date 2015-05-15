(function() {
    'use strict';

    angular.module('esqtv.video').controller("VideoEditCntrl", ['$scope', '$http', '$q', '$routeParams', '$window', '$location', 'video', videoCntrl]);
    
    function videoCntrl($scope, $http, $q, $routeParams, $window, $location, video) {
        var vm = this;
        vm.video = video.video;
        vm.selectedVideo = "hello";
        

        activate();

        function activate() {
           
        }


    };
    
})();