(function () {
    'use strict';
    angular
        .module('suricate.users', [])
        .config(['$interpolateProvider', function ($interpolateProvider) {
            return $interpolateProvider.startSymbol('{(').endSymbol(')}');
          }
        ])
        .controller('UsersCtrl', UsersCtrl);

    UsersCtrl.$inject = ['$http', '$scope'];

    function UsersCtrl($http, $scope) {
        $scope.users = [];
        $scope.showFeatured = true;
        loadUsers();

        function loadUsers() {
            $http.get('/companies-using-suricate/users.json').then(function(response) {
                $scope.users = response.data.users;
            });
        }
     }
})();
