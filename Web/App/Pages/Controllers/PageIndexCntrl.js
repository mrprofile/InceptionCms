;(function () {

'use strict';

angular.module('esqtv.pages').controller("PageIndexCntrl", ['$scope', '$sce', '$http', '$q', '$routeParams', '$window', '$location', 'pages', pageIndexCntrl]);

function pageIndexCntrl($scope, $sce, $http, $q, $routeParams, $window, $location, pages) {    
    var vm = this;
    console.log(pages);
    vm.selectItem = selectItem;
    vm.search = {
        query: '',
        results: pages.result,
        clear: function () {
            this.query = '';
        }
    };

    vm.paging = {
        numPages: 10,
        totalItems: 0,
        currentPage: 1,
        itemsPerPage: 12,
        onSelectPage: function () {

            search();
        }
    };

    vm.searchFunc = function () {
        vm.paging.currentPage = 1;
        search();
    }

    vm.selectedVideo = {};

    function selectItem(itm) {
        $location.path('/pages/edit/' + itm.id);
    }

    $scope.$on('esqtv:common:page:select', function (evt, itm) {
        vm.selectedVideo = itm;
        $location.path('/pages/edit/' + itm.id);
    });
}

})();