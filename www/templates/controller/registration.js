/**
 * Created by sics on 3/4/2015.
 */
Kinoto.controller('RegisterCtrl', function ($scope, $ionicPlatform, $rootScope, ajaxService, Validation,$state) {

    $scope.Title = '';

    $ionicPlatform.ready(function () {
        $scope.userReg = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            cPassword: '',
            type: $rootScope.userType
        }
    })
    $scope.registration = function (user) {
        if (Validation.NullValidate(user.firstName) == false) {
            $rootScope.showAlert('Warning', 'Please Enter the First Name', 'kinoto-warning');
        } else if (Validation.NullValidate(user.lastName) == false) {
            $rootScope.showAlert('Warning', 'Please Enter the Last Name', 'kinoto-warning');
        } else if (Validation.NullValidate(user.email) == false) {
            $rootScope.showAlert('Warning', 'Please Enter the Email', 'kinoto-warning');
        } else if (Validation.EmailValidate(user.email) == false) {
            $rootScope.showAlert('Warning', 'Please Enter the valid Email ', 'kinoto-warning');
        } else if (Validation.NullValidate(user.phone) == false) {
            $rootScope.showAlert('Warning', 'Please Enter the Phone Number ', 'kinoto-warning');
        } else if (Validation.NumberValidate(user.phone) == false) {
            $rootScope.showAlert('Warning', 'Please Enter the Phone Number in digits ', 'kinoto-warning');
        } /*else if (Validation.LengthValidate(user.phone,10) == false) {
            $rootScope.showAlert('Warning', 'Please Enter the Phone Number as 10 Digits ', 'kinoto-warning');
        } */else if (Validation.NullValidate(user.password) == false) {
            $rootScope.showAlert('Warning', 'Please Enter the Password ', 'kinoto-warning');
        } else if (Validation.NullValidate(user.cPassword) == false) {
            $rootScope.showAlert('Warning', 'Please Confirm Password ', 'kinoto-warning');
        } else if (Validation.ConfirmValidate(user.password,user.cPassword) == false) {
            $rootScope.showAlert('Warning', 'Password Mismatching ', 'kinoto-warning');
        }else{
            ajaxService.ajax('signUp.php', user).then(function (response) {
                $scope.result = response.data;
                if ($scope.result.status == 'success') {
                    $rootScope.showAlert('Success', 'Your Registration is success full', 'kinoto-success');
                    $scope.userReg = {
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        password: '',
                        cPassword: '',
                        type: $rootScope.userType
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
                else if($scope.result.status=='exist'){
                    $rootScope.showAlert('Warning', 'This email Id is already registered try with another ', 'kinoto-warning');
                }
                else{
                    $rootScope.showAlert('Warning', 'Due to some issue.. please try later ', 'kinoto-warning');
                }
            });
        }
    }

})
