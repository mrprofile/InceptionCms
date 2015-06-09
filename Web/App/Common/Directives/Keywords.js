(function () {
    'use strict';
    angular.module('esqtv.common').directive('keywordAutocomplete', ['esqtvSettings', function (esqtvSettings) {
        return {
            require: 'ngModel',
            restrict: 'EA',
            controller: ['$scope', 'KeywordService', function ($scope, KeywordService) {
                var vm = this;
                vm.selectedKeyword = { 'Id': vm.ngModel.id, 'Text': vm.ngModel.keywords };
                vm.keywords = [];
                vm.searchKeywordText = '';
                vm.searchKeywords = searchKeywords;
                vm.selectedItemChange = selectedItemChange;
                
                

                function selectedItemChange(item) {                    
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
            }
        };
    }]);

    angular.module('esqtv.common').directive('keywordChips', ['esqtvSettings', function (esqtvSettings) {
        return {
            require: 'ngModel',
            restrict: 'EA',
            controller: ['$scope', 'KeywordService', function ($scope, KeywordService) {
                var vm = this;

                vm.keywords = [];// $scope.ngModel;
                vm.searchKeywords = searchKeywords;
                vm.searchKeywordText = '';
                vm.selectedKeyword = selectedKeyword;

                activate();

                function activate() {
                    if (vm.ngModel.length > 0) {
                        var _keys = vm.ngModel.join(',');
                        KeywordService.getKeywords(_keys).then(function (data) {

                            if (data.Result.length > 0) {
                                for (var i = 0; i < data.Result.length; i++) {
                                    vm.keywords.push(data.Result[i]);
                                }
                            }


                        });
                    }

                    $scope.$watchCollection('vm.keywords', function (newVal, oldVal) {
                        vm.ngModel = [];
                        if (newVal.length > 0) {
                            for (var i = 0; i < newVal.length; i++) {
                                vm.ngModel.push(newVal[i].Id);
                            }
                        }
                    });
                    
                }

                

                function selectedKeyword(item) {

                }



                function searchKeywords(keyword) {

                    return KeywordService.search({ 'query': keyword }, { itemsPerPage: 24, currentPage: 0 }).then(function (response) {
                        return response.Result;
                    });
                }
            }],
            controllerAs: 'vm',
            template: '<md-chips ng-model="vm.keywords" md-autocomplete-snap md-require-match>\n' +
                '<md-autocomplete md-min-length="2" \n'+
                'md-delay="500" \n'+
                'md-search-text="vm.searchKeywordText" \n'+
                'md-selected-item-change="vm.selectedKeyword(item)" \n' +
                'md-items="item in vm.searchKeywords(vm.searchKeywordText)" \n'+
                'md-item-text="item.Text" \n'+
                'placeholder="Search for a keyword"> \n'+
                '<span md-highlight-text="vm.searchKeywordText">{{item.Text}} :: {{item.Id}}</span> \n'+
                '</md-autocomplete> \n'+
                    '<md-chip-template> \n'+
                    '<span>\n'+
                        '<strong>{{$chip.Text}}</strong>\n'+
                        '<em>({{$chip.Id}})</em>\n'+
                    '</span>\n'+
                    '</md-chip-template>\n'+
                '</md-chips>',
            bindToController: true,
            scope: {
                'ngModel': '='
            }
        }
    }]);

})();