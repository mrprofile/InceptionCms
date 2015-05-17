(function () {
    'use strict';
    var commonModule = angular.module('esqtv.common');

    commonModule.factory('AlertService', [ '$timeout', alertService]);

    function alertService($timeout) {
        var currentAlerts = [];
        var alertTypes = ['success', 'warning', 'info', 'danger'];
        
        var alerts = {
            addWarning: addWarning,
            addSuccess: addSuccess,
            addInfo: addInfo,
            addDanger: addDanger,
            addAlert : addAlert,
            currentAlerts: currentAlerts,
            alertTypes: alertTypes
        };
       
        return alerts;
        
        function addWarning(message) {
            addAlert('warning', message);
        }
        
        function addSuccess(message) {
            addAlert('success', message);
        }
        
        function addInfo(message) {
            addAlert('info', message);
        }
        
        function addDanger(message) {
            addAlert('danger', message);
        }
        
        function addAlert(type, message) {
            var alert = { type: type, msg: message };
            
            currentAlerts.push(alert);

            $timeout(function () {
                removeAlert(alert);
            }, 3500);
        }
        
        function removeAlert(alert) {
            for (var i = 0; i < currentAlerts.length; i++) {
                if (currentAlerts[i] == alert) {
                    currentAlerts.splice(i, 1);
                }
            }
        }
    }
})();