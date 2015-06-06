(function () {
    'use strict';
    var commonModule = angular.module('esqtv.common');

    commonModule.factory('DialogService', ['$mdDialog', notify]);

    function notify($mdDialog) {

        var notifier = {
            confirmDelete: confirmDelete
        };

        return notifier;

        function confirmDelete(ev, okText, cancelText, confirmCb, cancelCb) {
            var confirm = $mdDialog.confirm()
                 .parent(angular.element(document.body))
                 .title('Are you sure you want to delete this record?')
                 .content('This record will be permanently removed from the system.')
                 .ariaLabel('Lucky day')
                 .ok(okText)
                 .cancel(cancelText)
                 .targetEvent(ev);

            $mdDialog.show(confirm).then(function () {
                if (confirmCb !== 'undefined' && confirmCb != null) {
                    confirmCb();
                }
            }, function () {
                if (cancelCb !== 'undefined' && cancelCb != null) {
                    cancelCb();
                }
            });;
        }
    }
})();