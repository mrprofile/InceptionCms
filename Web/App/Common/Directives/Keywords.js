(function () {
    'use strict';
    angular.module('esqtv.common').directive('keywordAutocomplete', ['esqtvSettings', function (esqtvSettings) {
        return {
            require: 'ngModel',
            restrict: 'EA',
            controller: ['$scope', 'KeywordService', function ($scope, KeywordService) {
                console.log($scope);
                var vm = this;
                vm.selectedKeyword = { 'Id': vm.ngModel.id, 'Text': vm.ngModel.keywords };
                vm.keywords = [];
                vm.searchKeywordText = '';
                vm.searchKeywords = searchKeywords;
                vm.selectedItemChange = selectedItemChange;
                
                

                function selectedItemChange(item) {
                    console.log(item);
                    if (item) {
                        vm.ngModel.keywords = item.Text;
                        vm.ngModel.id = item.Id;
                        vm.keywords = [];
                    }
                }

                function searchKeywords(keyword) {

                    return KeywordService.search({ 'query': keyword }, { itemsPerPage: 24, currentPage: 0 }).then(function (response) {
                        return response.Result;
                    });
                }
            }],
            controllerAs: 'vm',
            transclude: true,
            templateUrl: esqtvSettings.cms + '/App/Common/Views/KeywordSearch.html',
            bindToController: true,
            scope: {
                'ngModel': '='
            },
            link: function ($scope) {
                console.log($scope);
            }
        };
    }]);

})();