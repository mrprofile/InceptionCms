(function () {
    'use strict';

    angular.module('esqtv.common').controller("TopNavController", ['$scope', '$mdSidenav', '$route', SideNavController]);

    function SideNavController($scope, $mdSidenav, $route) {
        var vm = this;
        
        vm.toggle = toggleMenu;
        vm.refresh = function () {
            $route.reload();
        }
        function toggleMenu() {
            $mdSidenav('left').toggle();
        }

    };

    angular.module('esqtv.common').controller("ToolbarController", ['$scope', '$mdSidenav', ToolbarController]);

    function ToolbarController($scope, $mdSidenav) {
        var vm = this;
        vm.toolbar = '';
        

    };

})();