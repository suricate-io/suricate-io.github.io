(function () {
    'use strict';

    angular.module('suricate.marketplace', ['ngRoute', 'marketplace.list', 'marketplace.details'])

        .config(['$interpolateProvider', function ($interpolateProvider) {
            return $interpolateProvider.startSymbol('{(').endSymbol(')}');
          }
        ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/list'
            });
        }]);
})();