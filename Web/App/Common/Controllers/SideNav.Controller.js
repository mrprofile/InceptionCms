(function () {
    'use strict';

    angular.module('esqtv.common').controller("SideNavController", ['$scope', '$location', '$window', SideNavController]);

    function SideNavController($scope, $location, $window) {
        var vm = this;
        
        vm.links = [
            { 'text': 'Home', 'url': '/' },
            { 'text': 'Pages', 'url': '/pages' },
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
            //console.log(link);
            $location.url(link.url);
            //$window.location = link.url;
        }

    };

})();