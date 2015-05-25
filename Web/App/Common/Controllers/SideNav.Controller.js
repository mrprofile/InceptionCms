(function () {
    'use strict';

    angular.module('esqtv.common').controller("SideNavController", ['$scope', '$location', SideNavController]);

    function SideNavController($scope, $location) {
        var vm = this;
        
        vm.links = [
            { 'text': 'Home', 'url': '/' },
            { 'text': 'Themes', 'url': '/' },
            { 'text': 'Videos', 'url': '/videos' },
            { 'text': 'Sliders', 'url': '/' },
            { 'text': 'Log Out', 'url': '/' },
        ];

        vm.goToPage = goToPage;

        activate();

        function activate() {}

        function goToPage(link, $evt) {
            $location.path(link);
        }

    };

})();