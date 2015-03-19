/**
 * Created by sics on 3/11/2015.
 */
Kinoto.controller('ConfirmationOrderCtrl', function ($scope, $ionicPlatform, $rootScope, ajaxService, Validation,$location,$state) {
    $ionicPlatform.ready(function(){
        $scope.data=$rootScope.senderConfirm;

        navigator.geolocation.getCurrentPosition(function(position) {
            $scope.position=position;
            var c = position.coords;
            $rootScope.centerLatitude=c.latitude;
            $rootScope.centerLongitude=c.longitude;
        },function(e) { console.log("Error retrieving position " + e.code + " " + e.message) });
    })
    $scope.acceptConfirmation=function(){
        ajaxService.ajax('senderAcceptConfirmation.php', {
            uid:localStorage.getItem('uid'),
            id:$rootScope.senderId
        }).then(function (response) {
            $scope.result = response.data;
            if ($scope.result.status == 'success') {
                $rootScope.senderId='';
            }
        })
    }
});