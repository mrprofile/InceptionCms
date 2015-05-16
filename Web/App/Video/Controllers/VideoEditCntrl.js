(function() {
    'use strict';

    angular.module('esqtv.video').controller("VideoEditCntrl", ['$scope', '$sce', '$http', '$q', '$routeParams', '$window', '$location', 'video', videoCntrl]);
    
    function videoCntrl($scope, $sce, $http, $q, $routeParams, $window, $location, video) {
        var vm = this;
        vm.video = video.video;
        vm.selectedVideo = "hello";
        
        vm.objectStr = '';

        activate();

        function activate() {
          
          for (var key in vm.video) {
            vm.objectStr += '<p>';
            vm.objectStr += key;
            vm.objectStr += ':';
            vm.objectStr += vm.video[key];
            vm.objectStr += '</p>';
          }

          vm.objectStr = $sce.trustAsHtml(vm.objectStr);

        }


    };
    
})();