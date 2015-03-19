/**
 * Created by sics on 3/6/2015.
 */
Kinoto.controller('DriverEntryCtrl', function ($scope, $ionicPlatform, $rootScope, ajaxService, Validation, $location, $state) {
    $scope.whoiswhere = [];
    //$scope.basel = { lat: 47.55633987116614, lon: 7.576619513223015 };
    $scope.basel = {lat: 8.567749500000000000, lon: 76.873515799999950000};

    $scope.Driver = {
        start: '',
        end: ''
    }
    $scope.Origin = '';
    $scope.Destination = '';
    $scope.Vehicle = '';
    // check login code
    $ionicPlatform.ready(function () {
        ajaxService.ajax('getDriverDetails.php', {
            uid: localStorage.getItem('uid')
        }).then(function (response) {
            $scope.result = response.data;
            if ($scope.result.status == 'success') {
                $scope.data = $scope.result.data;
                $rootScope.senderLocations = [
                    {"name": "startPoint", "lat": $scope.data.start_lat, "lon": $scope.data.start_long},
                    {"name": "EndPoint", "lat": $scope.data.end_lat, "lon": $scope.data.end_long}
                ];
                $scope.Driver = {
                    start: $scope.data.start,
                    end: $scope.data.end
                }
                $scope.Vehicle = $scope.data.vehicle;
            }
        })
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.position = position;
            var c = position.coords;
            $rootScope.centerLatitude = c.latitude;
            $rootScope.centerLongitude = c.longitude;
        }, function (e) {
            console.log("Error retrieving position " + e.code + " " + e.message)
        });


    });
    $scope.selectVehicle = function (value) {
        $scope.Vehicle = value;
    }
    $scope.submitDriverEntry = function (driver) {
        if (Validation.NullValidate(driver.start) == false) {
            $rootScope.showAlert('Warning', 'Please enter the starting address', 'kinoto-warning');
        } else if (Validation.NullValidate(driver.end) == false) {
            $rootScope.showAlert('Warning', 'Please enter the ending address', 'kinoto-warning');
        } else if (Validation.NullValidate($scope.Vehicle) == false) {
            $rootScope.showAlert('Warning', 'Please select the vehicle', 'kinoto-warning');
        } else {
            $scope.markers=[];
            $scope.params = {
                uid: localStorage.getItem('uid'),
                start: driver.start,
                end: driver.end,
                vehicle: $scope.Vehicle
            }
            ajaxService.ajax('driverDetails.php', $scope.params).then(function (response) {
                $scope.result = response.data;
                if ($scope.result.status == 'success') {
                    $scope.driver = $scope.result.driver;
                    $scope.customer = $scope.result.customers;
                    $rootScope.Map = {
                        start: $scope.driver.start,
                        end: $scope.driver.end
                    }
                    if ($scope.customer.status == 'success') {
                        $scope.customerData = $scope.customer.data;
                        angular.forEach($scope.customerData, function (value, key) {
                            $scope.markers.push({
                                "id": $scope.customerData[key].id,
                                "uid": $scope.customerData[key].uid,
                                "lat": $scope.customerData[key].start_lat,
                                "lon": $scope.customerData[key].start_long
                            });
                        });
                    }
                    $rootScope.markers=$scope.markers;
                    $state.go('menu.detailMap');
                }
            })
        }
    }
})
