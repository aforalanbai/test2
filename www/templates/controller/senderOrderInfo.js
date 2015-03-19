/**
 * Created by sics on 3/17/2015.
 */

Kinoto.controller('SenderOrderInfoCtrl', function ($scope, $ionicPlatform, $rootScope, ajaxService, Validation, $location, $state) {
    $ionicPlatform.ready(function(){
        $scope.params = {
            id:$rootScope.senderId,
            uid: $rootScope.senderUid
        }
        ajaxService.ajax('getSenderConfirmationDetails.php', $scope.params).then(function (response) {
            $scope.result = response.data;
            if ($scope.result.status == 'success') {
                $scope.data=$scope.result.data;
                $scope.senderDetails={
                    start:$scope.data.start,
                    end:$scope.data.end,
                    pickupDate:$scope.data.pickupDate,
                    pickupTime:$scope.data.pickupTime,
                    deliveryDate:$scope.data.deliveryDate,
                    deliveryTime:$scope.data.deliveryTime,
                    parcel:$scope.data.parcel
                }
            }
        })
    })
});
