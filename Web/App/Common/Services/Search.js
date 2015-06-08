(function () {
    'use strict';
    var commonModule = angular.module('esqtv.common');

    commonModule.factory('SearchService', [searchService]);

    function searchService() {
        var search = {
            query: '',
            results: [],
            clear: function () {
                this.query = '';
            }
        };

        var paging = {
            numPages: 10,
            totalItems: 0,
            currentPage: 1,
            itemsPerPage: 12,
            onSelectPage: function() {}
    };
        
        var searchObj = {
            search: search,
            paging: paging
        };
       
        return searchObj;
    }
})();