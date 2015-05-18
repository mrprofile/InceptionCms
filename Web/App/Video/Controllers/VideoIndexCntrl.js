(function() {
    'use strict';

    angular.module('esqtv.video').controller("VideoIndexCntrl", ['$scope', '$http', '$q', '$routeParams', '$window', '$location', 'VideoService', 'AlertService', videoCntrl]);
    
    function videoCntrl($scope, $http, $q, $routeParams, $window, $location, VideoService, AlertService) {
        var vm = this;
        
        vm.videos = [];
        vm.selectedVideo = {};
        activate();
        
        function activate() {           
        }
        
        $scope.$on('esqtv:common:video:select', function (evt, itm) {
            vm.selectedVideo = itm;
            console.log(itm);

            $location.path('/videos/edit/' + itm.Video_Key);
        });
    };
})();