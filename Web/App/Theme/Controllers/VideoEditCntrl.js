(function () {
    'use strict';

    angular.module('esqtv.video').controller("VideoEditCntrl", ['$scope', '$sce', '$http', '$q', '$routeParams', '$window', '$location', 'video', 'KeywordService', 'VirtualDirectoryService', videoCntrl]);

    function videoCntrl($scope, $sce, $http, $q, $routeParams, $window, $location, video, KeywordService, VirtualDirectoryService) {
        var vm = this;
        console.log(video);
        vm.video = video.video;
        vm.keywords = [];
        vm.keywordKeys = video.keywords;
        vm.virtualDirectory = [];
        vm.virtualDirectories = video.virtualdirectories;
        vm.disablePrimaryVd = false;
        vm.selectVd = function (itm) {
            console.log(itm);
        }
        vm.selectedVideo = "hello";
        vm.videoEmbed = generateEmbedUrl;
        vm.searchKeywordText = '';
        vm.selectedKeyword = function (item) {
            console.log(item);
        };
        vm.searchKeywords = searchKeywords;
        vm.matchedKeywords = []
        vm.objectStr = '';

        //Virtual Directories
        vm.searchVdText = '';
        vm.searchVd = searchVd;

        activate();

        function activate() {

            for (var key in vm.video) {
                vm.objectStr += '<p>';
                vm.objectStr += key;
                vm.objectStr += ':';
                vm.objectStr += vm.video[key];
                vm.objectStr += '</p>';
            }

            vm.objectStr = $sce.trustAsHtml(vm.objectStr);

            if (vm.keywordKeys.length > 0) {

                var keys = vm.keywordKeys.join(',');
                KeywordService.getKeywords(keys).then(function (resp) {                    
                    vm.keywords = resp.Result;
                });
            }

            if (vm.video.VirtualDirectory_Key > 0) {
                VirtualDirectoryService.getDirectories(vm.video.VirtualDirectory_Key).then(function (resp) {
                    vm.virtualDirectory = resp.Result;
                });                
            }

        }

        function generateEmbedUrl() {
            return $sce.trustAsResourceUrl('http://tv.esquire.com/videos/embed/' + vm.video.InternalEncryptedKey);
        }

        function searchKeywords(keyword) {

            return KeywordService.search({ 'query': keyword }, { itemsPerPage: 24, currentPage: 0 }).then(function (response) {
                return response.Result;
            });
        }

        function searchVd(query) {
            if (vm.virtualDirectory.length > 1) {
                return [];
            }
            return VirtualDirectoryService.search({ 'query': query }, { itemsPerPage: 24, currentPage: 0 }).then(function (response) {
                return response.Result;
            });
        }

    };

})();