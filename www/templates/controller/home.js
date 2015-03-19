/**
 * Created by sics on 3/4/2015.
 */
Kinoto.controller('HomeCtrl', function ($scope, $state) {
    $scope.openRegister = function () {
        $state.go('registerSelect');
    }
})
