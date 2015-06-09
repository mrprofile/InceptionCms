; (function () {
    'use strict';
    angular.module('esqtv.slider').controller('SlideEditCntrl', ['$scope', 'KeywordService', 'slide', function ($scope, KeywordService, slide) {
        var vm = this;
        vm.keywords = [];
        vm.slide = slide;

        
    }]);
})();