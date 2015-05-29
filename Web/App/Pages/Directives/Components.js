(function () {
    'use strict';
    angular.module('esqtv.pages').directive('component', ['$compile', 'esqtvSettings', function ($compile, esqtvSettings) {

        var getTemplate = function (contentType) {

            var template = '';

            switch (contentType) {
                case 'heading': template = '<p>{{component.data.text}}</p>';
                    break;
                case 'video': template = '<p>{{component.contentType}}</p>';
                    break;
                case 'videoList': template = '<md-content layout=\"row\"><keyword-autocomplete data-ng-model=\"component.data\"></keyword-autocomplete><md-input-container><label>Title</label><input type=\"text\" data-ng-model=\"component.title\" /></md-input-container><md-input-container><label>Number of videos to show</label><input type=\"number\" data-ng-model=\"component.data.itemCount\" min=\"1\" /></md-input-container></md-content><md-content><video-list keyword-id=\"component.data\" item-count=\"component.data.itemCount\"></video-list></md-content>';
                    break;
                case 'gallery': template = '<p>{{component.contentType}}</p>';
                    break;
                case 'image': template = '<md-content data-ng-if="component.data.url"><md-button class=\"md-accent md-raised esq-btn-float \" data-ng-click=\"clearComponent(component)\">Change Image</md-button><img class="img-responsive" data-ng-src="{{component.data.url}}" /></md-content><md-content data-ng-if=\"!component.data.url.length\"><md-input-container><label>Image Url</label><input type="text" data-ng-model=\"component.data.url\" /></md-input-container><image-search selected-item="component.data" imagetypekey=\"31\"></image-search></md-content>';
                    break;
                case 'embed': template = '<p>{{component.contentType}}</p>';
                    break;
                case 'text': template = '<p>{{component.data.text}}</p>';
                    break;
            };

            return template;
        }

        var linker = function (scope, element, attrs) {            
            element.html(getTemplate(scope.component.contentType));
            $compile(element.contents())(scope);
        }

        return {
            restrict: 'EA',
            transclude: true,
            controller:['$scope', function($scope) {
                $scope.clearComponent = clear;

                function clear(component) {
                    console.log("Clearing: ", component);
                    component.data.url = '';
                    component.data.id = 0;
                };
            }],
            scope: {
                'component': '=componentData'
            },
            link: linker
        };
    }]);
})();