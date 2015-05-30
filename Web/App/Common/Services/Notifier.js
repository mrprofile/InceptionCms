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
            notifyMessage(message);
        }

        function notifySuccess(message) {
            notifyMessage(message);
        }

        function notifyInfo(message) {
            notifyMessage(message);
        }

        function notifyDanger(message) {
            notifyMessage(message);
        }

        function notifyWait(message) {
            notifyMessage(message);
        }

        function notifyMessage(message) {

            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .action('ok')
                    .highlightAction(true)
                    .position('top right')
                    .hideDelay(3500));
        }
    }
})();