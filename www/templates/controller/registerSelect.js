/**
 * Created by sics on 3/5/2015.
 */
Kinoto.controller('RegisterSelectCtrl', function($scope,$rootScope,$state) {
    /**
     * for here user choose his type of registration where
     * 0 for user/customer registration
     * 1 for driver/cab taker registration
     * @param value
     */
    $scope.selectRegistrationType=function(value){
        $rootScope.userType=value;
        $state.go('register');
    }
})
