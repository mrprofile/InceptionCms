(function () {
    'use strict';
    angular.module('esqtv.pages').directive('component', ['$compile', 'esqtvSettings', function ($compile, esqtvSettings) {

        var getTemplate = function (contentType) {

            var template = '';

            switch (contentType) {
                case 'heading': template = '<header ck-editor-inline ck-style=\"header_styles\" contenteditable=\"true\" data-ng-model=\"component.data.text\"></header>';
                    break;
                case 'video': template = '<md-content data-ng-if=\"show(component)\" ><md-button class=\"md-icon-button md-accent esqtv-btn-float-top-right \" data-ng-click=\"clearComponent(component)\" title="Change video"><md-icon md-font-icon="ion-edit"></md-icon></md-button><ent-video-preview video=\"component.data\"></ent-video-preview></md-content><md-content data-ng-if=\"!show(component)\"><video-search selected-video=\"component.data\"></video-search></md-content>';
                    break;
                case 'videoList': template = '<md-content layout=\"row\" layout-align=\"start center\"><keyword-autocomplete data-ng-model=\"component.data\"></keyword-autocomplete><md-input-container><label>Title</label><input type=\"text\" data-ng-model=\"component.title\" /></md-input-container><md-input-container><label>Number of videos to show</label><input type=\"number\" data-ng-model=\"component.data.itemCount\" min=\"1\" /></md-input-container></md-content><md-content ng-if="show(component)"><video-list keyword-id=\"component.data\" item-count=\"component.data.itemCount\"></video-list></md-content>';
                    break;
                case 'gallery': template = '<p>{{component.contentType}}</p>';
                    break;
                case 'image': template = '<md-content data-ng-if="show(component)"><md-button class=\"md-icon-button md-accent esqtv-btn-float-top-right\" data-ng-click=\"clearComponent(component)\" title="Change Image"><md-icon md-font-icon="ion-edit"></md-icon></md-button><img class="img-responsive" data-ng-src="{{component.data.url}}" /></md-content><md-content data-ng-if=\"!show(component)\"><md-input-container><label>Image Url</label><input type="text" data-ng-model=\"component.data.url\" /></md-input-container><image-search selected-item="component.data" imagetypekey=\"31\"></image-search></md-content>';
                    break;
                case 'embed': template = '<p>{{component.contentType}}</p>';
                    break;
                case 'text': template = '<div class=\"content\" style="min-height: 150px;" ck-editor ck-style=\"content_styles\" data-ng-model=\"component.data.text\" contenteditable=\"true\"></div>';
                    break;
            };

            return template;
        }

        var linker = function (scope, element, attrs) {            
            element.html(getTemplate(scope.component.contentType));
            $compile(element.contents())(scope);

            scope.$on('$destroy', function () {
                scope.$destroy();
            });

        }

        return {
            restrict: 'EA',
            transclude: true,
            controller:['$scope', function($scope) {
                $scope.clearComponent = clear;
                $scope.show = showComponent;

                function showComponent(component) {
                    var show = false;

                    switch (component.contentType) {
                        case 'video':
                            show = component.data.id != '';
                            break;
                        case 'image':
                            show = component.data.url != '';
                            break;
                        case 'videoList':
                            show = component.data.keywords != '';
                            break;
                    };

                    return show;
                }

                function clear(component) {                    
                    component.data.url = '';
                    component.data.id = 0;
                };

                $scope.$on('$destroy', function () {
                    $scope.$destroy();
                });
            }],
            scope: {
                'component': '=componentData'
            },
            link: linker
        };
    }]);
})();