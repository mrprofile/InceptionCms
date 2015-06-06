(function () {
    'use strict';
    var commonModule = angular.module('esqtv.common');

    commonModule.factory('NotifierService', ['$mdToast', notify]);

    function notify($mdToast) {

        var notifier = {
            notifyWarning: notifyWarning,
            notifySuccess: notifySuccess,
            notifyInfo: notifyInfo,
            notifyDanger: notifyDanger,
            notifyWait: notifyWait
        };

        return notifier;

        function notifyWarning(message) {
            notifyMessage('error', message);
        }

        function notifySuccess(message) {
            notifyMessage('success', message);
        }

        function notifyInfo(message) {
            notifyMessage('info', message);
        }

        function notifyDanger(message) {
            notifyMessage('error', message);
        }

        function notifyWait(message) {
            notifyMessage('wait', message);
        }

        function notifyMessage(type, message) {
            var config =
            {
                controller: 'MdToastController',
                template: '<md-toast class="md-toast ' + type + '"><span flex>' + message + '</span><md-button ng-click="closeToast()">Ok</md-button></md-toast>',
                hideDelay: 6000,
                position: 'top right'
            };
            $mdToast.show(config);
        }
    }
})();