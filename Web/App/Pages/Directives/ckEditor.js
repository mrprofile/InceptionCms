;(function () {
    'use strict';
    angular.module('esqtv.pages').directive('ckEditor', [function () {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function ($scope, elm, attr, ngModel) {

                if (!CKEDITOR) return;
                if (!ngModel) return;

                var ck = CKEDITOR.inline(elm[0], {
                    toolbar: [{
                        name: "custom", items: ["Bold", "Italic", "RemoveFormat", '-', 'NumberedList', 'BulletedList', "Styles", "Format", "ShowBlocks", "CreateDiv", "Source"]
                    }],
                    extraPlugins: 'autogrow,showblocks,div',
                    autoGrow_minHeight: 300,
                    autoGrow_maxHeight: 675,
                    stylesSet: attr.ckStyle ? attr.ckStyle : '',
                    //format_tags: 'p;h1;h2;h3;h4;h5;h6',
                    extraAllowedContent: '*[*] (*) {*}',
                    contentsCss: '/css/content.css'
                });

                ck.on('instanceReady', function () {
                    ck.setData(ngModel.$viewValue);
                });

                ck.on('pasteState', function () {
                    $scope.$apply(function () {
                        ngModel.$setViewValue(ck.getData());
                    });
                });

                ngModel.$render = function (value) {
                    ck.setData(ngModel.$modelValue);
                };

                $scope.$on('$destroy', function () {
                    console.log('destroyed ckeditor');
                    CKEDITOR.instances[ck.name].destroy(true);
                });
            }
        };
    }]);

    angular.module('esqtv.pages').directive('ckEditorInline', [function () {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function ($scope, elm, attr, ngModel) {

                if (!CKEDITOR) return;
                if (!ngModel) return;

                var ck = CKEDITOR.inline(elm[0], {
                    toolbar: [
                        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                        { name: 'formatting', items: ['ShowBlocks'] }
                    ],
                    stylesSet: attr.ckStyle ? attr.ckStyle : '',
                    format_tags: 'h1;h2;h3;h4;h5;h6',
                    extraAllowedContent: 'h1 h2 h3 h4 h5 h6 div span[*] (*);em i'
                });

                ck.on('instanceReady', function () {
                    ck.setData(ngModel.$viewValue);
                });

                ck.on('pasteState', function () {
                    $scope.$apply(function () {
                        ngModel.$setViewValue(ck.getData());
                    });
                });

                ngModel.$render = function (value) {
                    ck.setData(ngModel.$modelValue);
                };

                $scope.$on('$destroy', function () {

                    CKEDITOR.instances[ck.name].destroy(true);
                    console.log(CKEDITOR.instances);
                });
            }
        };
    }]);

})();