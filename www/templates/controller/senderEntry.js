/**
 * Created by sics on 3/10/2015.
 */
Kinoto.controller('SenderEntryCtrl', function ($scope, $ionicPlatform, $rootScope, ajaxService, Validation,$location,$state) {
    $scope.sender={
        pickupDate:'',
        pickupTime:'',
        deliveryDate:'',
        deliveryTime:'',
        start:'',
        end:'',
        parcel:''
    }
    $ionicPlatform.ready(function(){

    })
    $scope.submitSenderEntry=function(user){
        alert('hai')
        if(Validation.NullValidate(user.pickupDate)==false){
            $rootScope.showAlert('Warning','Please enter the pickup date','kinoto-warning');
        }else  if(Validation.NullValidate(user.pickupTime)==false){
            $rootScope.showAlert('Warning','Please enter the pickup  time','kinoto-warning');
        }else  if(Validation.NullValidate(user.deliveryDate)==false){
            $rootScope.showAlert('Warning','Please enter the delivery date ','kinoto-warning');
        }else  if(Validation.NullValidate(user.deliveryTime)==false){
            $rootScope.showAlert('Warning','Please enter the delivery time','kinoto-warning');
        }else  if(Validation.DateValidate(user.pickupDate,user.deliveryDate)==false){
            $rootScope.showAlert('Warning','Delivery Date must be greater than Pickup Date','kinoto-warning');
        }else  if(Validation.NullValidate(user.start)==false){
            $rootScope.showAlert('Warning','Please enter the starting address','kinoto-warning');
        }else  if(Validation.NullValidate(user.end)==false){
            $rootScope.showAlert('Warning','Please enter the ending address','kinoto-warning');
        }else  if(Validation.NullValidate(user.parcel)==false){
            $rootScope.showAlert('Warning','Please enter the parcel type','kinoto-warning');
        }else{
            $scope.params={
                id:$rootScope.senderId,
                pickupDate:user.pickupDate,
                pickupTime:user.pickupTime,
                deliveryDate:user.deliveryDate,
                deliveryTime:user.deliveryTime,
                start:user.start,
                end:user.end,
                parcel:user.parcel,
                uid:localStorage.getItem('uid')
            }
            console.log($scope.params);
            ajaxService.ajax('senderDetails.php', $scope.params).then(function (response) {
                $scope.result = response.data;
                if ($scope.result.status == 'success') {
                    $scope.data=$scope.result.data;
                    $rootScope.senderLocations = [
                        { "name": "startPoint", "lat":  $scope.data.start_lat, "lon": $scope.data.start_long },
                        { "name": "EndPoint", "lat": $scope.data.end_lat, "lon": $scope.data.end_long }
                    ];
                    $rootScope.senderConfirm={
                        start:$scope.data.start,
                        end:$scope.data.end,
                        pickupDate:$scope.data.pickupDate,
                        pickupTime:$scope.data.pickupTime,
                        deliveryDate:$scope.data.deliveryDate,
                        deliveryTime:$scope.data.deliveryTime,
                        parcel:$scope.data.parcel
                    }
                    $rootScope.senderId=$scope.data.id;
                    $state.go('menu.confirmationOrder');
                }
            })
        }

    }
})
