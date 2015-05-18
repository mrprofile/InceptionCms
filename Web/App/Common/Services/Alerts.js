(function () {
    'use strict';
    var commonModule = angular.module('esqtv.common');

    commonModule.factory('AlertService', [ 'toaster', alertService]);

    function alertService(toaster) {

        var alerts = {
            addWarning: addWarning,
            addSuccess: addSuccess,
            addInfo: addInfo,
            addDanger: addDanger,
            addWait: addWait
        };
       
        return alerts;
        
        function addWarning(title, message) {
            addAlert('warning', title, message);
        }
        
        function addSuccess(title, message) {
            addAlert('success', title, message);
        }
        
        function addInfo(title, message) {
            addAlert('info', title, message);
        }
        
        function addDanger(title, message) {
            addAlert('error', title, message);
        }
        
        function addWait(title, message) {
            addAlert('wait', title, message);
        }
        
        function addAlert(type, title, message) {

            var toastConfig = {
                type: type,
                title: title,
                body: message,
                showCloseButton: true,
                timeout: 4000
            };
            
            toaster.pop(toastConfig);
        }
    }
})();