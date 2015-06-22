;(function () {
    'use strict';
    angular.module('esqtv.pages').directive('entContentPicker', ['$compile', 'esqtvSettings', 'pageComponent', function ($compile, esqtvSettings, pageComponent) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                'components': '=',
                'insertAt': '@'
            },
            controller: ['$scope', function ($scope) {
                $scope.show = false;               

                $scope.showPicker = function () {
                    return $scope.show;
                }

                $scope.clickBtn = function () {
                    $scope.show = true;
                }

                $scope.hidePicker = function () {
                    $scope.show = false;
                }

                $scope.add = function (itm) {                    
                    $scope.components.splice(Number($scope.insertAt) + 1, 0, pageComponent.create(itm));

                    $scope.show = false;
                }
            }],
            template: '<div flex layout="column" layout-align="center center"  >' +
                      '<md-button ng-if="!showPicker()" ng-click="clickBtn()" flex ><md-icon md-font-icon="ion-android-add-circle" aria-label="Add Component" style="font-size: 24px;"></md-icon></md-button>' +
                        '<ul ng-if="showPicker()" layout layout-align="center center" layout-wrap class="content-picker">                                                                         ' +
                        '<li><md-button ng-click="add(\'heading\')"><md-icon md-font-icon="ion-pound" class="block font-icon-sz-24"></md-icon><span>Heading</span></md-button></li>                          '+
                        '<li><md-button ng-click="add(\'text\')"><md-icon md-font-icon="ion-edit" class="block font-icon-sz-24"></md-icon><span>Text</span></md-button></li>                              ' +
                        '<li><md-button ng-click="add(\'image\')"><md-icon md-font-icon="ion-images" class="block font-icon-sz-24"></md-icon><span>Image</span></md-button></li>                           ' +
                        '<li><md-button ng-click="add(\'video\')"><md-icon md-font-icon="ion-android-film" class="block font-icon-sz-24"></md-icon><span>Video</span></md-button></li>                     ' +
                        '<li><md-button ng-click="add(\'videoList\')"><md-icon md-font-icon="ion-android-list" class="block font-icon-sz-24"></md-icon><span>Video List</span></md-button></li>                ' +
                        '<li><md-button ng-click="add(\'embed\')"><md-icon md-font-icon="ion-android-globe" class="block font-icon-sz-24"></md-icon><span>Embed</span></md-button></li>                    ' +
                        '</ul>' +
                      '</div>',
            link: function (scope, element, attr) {
                element.bind('mouseleave', function (evt) {
                    scope.show = false;
                });
            }
        }
    }]);

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
                case 'column': template = '<div class=\"{{component.data.cols}}\"><md-button>Add</md-button><div ng-repeat=\"itm in component.data.contentParts\"><component component-data="itm"></component></div></div>';
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