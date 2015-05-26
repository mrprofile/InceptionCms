(function () {
    'use strict';

    angular.module('esqtv.common').controller("SideNavController", ['$scope', '$window', SideNavController]);

    function SideNavController($scope, $window) {
        var vm = this;
        
        vm.links = [
            { 'text': 'Home', 'url': '/' },
            { 'text': 'Galleries', 'url': '/galleries' },
            { 'text': 'Themes', 'url': '/themes' },
            { 'text': 'Videos', 'url': '/videos' },
            { 'text': 'Sliders', 'url': '/sliders' },
            { 'text': 'Log Out', 'url': '/logoff' },
        ];

        vm.goToPage = goToPage;

        activate();

        function activate() {}

        function goToPage(link, $evt) {
            $window.location = link.url;
        }

    };

})();