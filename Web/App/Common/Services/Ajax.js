﻿(function () {
    'use strict';
    angular.module('esqtv.common').factory('AjaxService', ['$http', function ($http) {

        var service = {
            ajaxPost: ajaxPost,
            ajaxGet: ajaxGet,
            ajaxPut: ajaxPut,
            ajaxDelete: ajaxDelete,
            ajaxCustom: ajaxCustom
        };

        function ajaxPost(data, route, successFunction, errorFunction) {
            $http.post(route, data).success(function (response, status, headers, config) {
                successFunction(response, status);
            }).error(function (response) {
                errorFunction(response);
            });
        };

        function ajaxGet(route, successFunction, errorFunction) {
            $http({ method: 'GET', url: route }).success(function (response, status, headers, config) {
                successFunction(response, status);
            }).error(function (response) {
                errorFunction(response);
            });
        }

        function ajaxPut(route, data, successFunction, errorFunction) {
            $http.put(route, data).success(function (response, status, headers, config) {
                successFunction(response, status);
            }).error(function (response) {
                errorFunction(response);
            });
        }

        function ajaxDelete(route, data, successFunction, errorFunction) {
            $http.delete(route, data).success(function (response, status, headers, config) {
                successFunction(response, status);
            }).error(function (response) {
                errorFunction(response);
            });
        }

        function ajaxCustom(reqConfig, successFunction, errorFunction) {
            $http(reqConfig).success(function (response, status, headers, config) {
                successFunction(response, status);
            }).error(function (response) {
                errorFunction(response);
            });
        }

        return service;
    }]);
})();