(function () {
    'use strict';

    angular.module('esqtv.common').controller("MdToastController", ['$scope', '$mdToast', mdToastController]);

    function mdToastController($scope, $mdToast) {

        $scope.closeToast = function() {
            $mdToast.hide();
        };
    };
})();