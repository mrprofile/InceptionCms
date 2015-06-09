; (function () {
    'use strict';
    angular.module('esqtv.slider').controller('SlideEditCntrl', ['$scope', 'slide', function ($scope, slide) {
        var vm = this;
        vm.slide = slide;        
    }]);
})();