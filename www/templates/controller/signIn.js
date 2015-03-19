/**
 * Created by sics on 3/6/2015.
 */
Kinoto.controller('signInCtrl', function ($scope, $ionicPlatform, $rootScope, ajaxService, Validation,$state) {
    $ionicPlatform.ready(function(){
       $scope.userSign={
           email:'',
           password:''
       }
    });
    $scope.signIn=function(user){
        if (Validation.NullValidate(user.email) == false) {
            $rootScope.showAlert('Warning', 'Please Enter the Email', 'kinoto-warning');
        } else if (Validation.EmailValidate(user.email) == false) {
            $rootScope.showAlert('Warning', 'Please Enter the valid Email ', 'kinoto-warning');
        } else if(Validation.NullValidate(user.password)==false){
            $rootScope.showAlert('Warning', 'Please Enter the Password ', 'kinoto-warning');
        }else{
            ajaxService.ajax('signIn.php', user).then(function (response) {
                $scope.result = response.data;
                if ($scope.result.status == 'success') {
                    $scope.userSign={
                        email:'',
                        password:''
                    }
                    $scope.data=$scope.result.data;
                    localStorage.setItem('uid',$scope.data.id);
                    localStorage.setItem('userName',$scope.data.firstName);
                    $rootScope.userType=$scope.data.type;
                    if($scope.data.type==1){
                        $state.go('driverEntry');
                    }else{
                        $state.go('senderEntry');
                    }
                }
                else{
                    $rootScope.showAlert('Warning', 'Due to some issue.. please try later ', 'kinoto-warning');
                }
            });
        }
    }
})
