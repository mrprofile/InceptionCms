(function () {
    'use strict';

    //TODO: INJECT DEPENDENCIES
    angular.module('esqtv.pages', ['esqtv.common'])
        .factory('pageComponent', function pageComponentFactory() {

            return {
                create: createComponent
            };

            function createComponent(type) {
                var obj = {};
                switch (type) {
                    case 'heading': obj = { title: 'Heading', contentType: 'heading', data: { text: '' } };
                        break;
                    case 'video': obj = { title: 'Video', contentType: 'video', data: { id: '', source: '' } };
                        break;
                    case 'videoList': obj = { title: 'Videos By Keyword', contentType: 'videoList', data: { id: '', itemCount: 8, keywords: '' } };
                        break;
                    case 'gallery': obj = { title: 'Gallery', contentType: 'gallery', data: { id: '' } };
                        break;
                    case 'image': obj = { title: 'Image', contentType: 'image', data: { id: '', url: '' } };
                        break;
                    case 'embed': obj = { title: 'Embed', contentType: 'embed', data: { html: '' } };
                        break;
                    case 'text': obj = { title: 'Text', contentType: 'text', data: { text: '' } };
                        break;
                };

                return obj;
            };
        });
})()

