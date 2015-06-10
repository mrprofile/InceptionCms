(function () {
    'use strict';

    angular.module('esqtv.common').controller("TopNavController", ['$scope', '$mdSidenav', '$route', sideNavController]);

    function sideNavController($scope, $mdSidenav, $route) {
        var vm = this;
        
        vm.toggle = toggleMenu;
        vm.refresh = function () {
            $route.reload();
        }
        function toggleMenu() {
            $mdSidenav('left').toggle();
        }

    };

    angular.module('esqtv.common').controller("ToolbarController", ['$scope', '$mdSidenav', toolbarController]);

    function toolbarController() {
        var vm = this;
        vm.toolbar = '';
    };
})();