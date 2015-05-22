(function () {
    'use strict';

    angular.module('esqtv.common').controller("SideNavController", ['$scope', SideNavController]);

    function SideNavController($scope) {
        var vm = this;
        
        vm.links = [
            { 'text': 'Home', 'url': '/' },
            { 'text': 'Themes', 'url': '/' },
            { 'text': 'Videos', 'url': '/' },
            { 'text': 'Sliders', 'url': '/' },
            { 'text': 'Log Out', 'url': '/' },
        ];

        vm.goToPage = goToPage;

        activate();

        function activate() {}

        function goToPage(link, $evt) {
            console.log(link);
        }

    };

})();