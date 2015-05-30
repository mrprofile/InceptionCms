(function () {
    'use strict';

    angular.module('esqtv.common').controller("TopNavController", ['$scope', '$mdSidenav', SideNavController]);

    function SideNavController($scope, $mdSidenav) {
        var vm = this;
        
        vm.toggle = toggleMenu;

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