/**
 * Created by sics on 3/6/2015.
 */

/**
 * Handle Google Maps API V3+
 */
// - Documentation: https://developers.google.com/maps/documentation/
Kinoto
    .directive("appMap", function ($window, $rootScope) {
        return {
            restrict: "E",
            replace: true,
            template: "<div></div>",
            scope: {
                center: "=",        // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
                markers: "=",       // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
                origin:"@",         //for adding origin name
                destination:"@",    //for adding destination name
                width: "@",         // Map width in pixels.
                height: "@",        // Map height in pixels.
                zoom: "@",          // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
                mapTypeId: "@",     // Type of tile to show on the map (roadmap, satellite, hybrid, terrain).
                panControl: "@",    // Whether to show a pan control on the map.
                zoomControl: "@",   // Whether to show a zoom control on the map.
                scaleControl: "@"   // Whether to show scale control on the map.
            },

            link: function (scope, element, attrs) {
                var toResize, toCenter;
                var map;
                var infowindow;
                var currentMarkers;
                var callbackName = 'InitMapCb';

                // callback when google maps is loaded
                $window[callbackName] = function () {
                    console.log("map: init callback");
                    createMap();
                    updateMarkers();
                    updateRoute();
                };

                if (!$window.google || !$window.google.maps) {
                    console.log("map: not available - load now gmap js");
                    loadGMaps();
                }
                else {
                    console.log("map: IS available - create only map now");
                    createMap();
                }
                function loadGMaps() {
                    console.log("map: start loading js gmaps");
                    var script = $window.document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=InitMapCb';
                    $window.document.body.appendChild(script);
                }

                function createMap() {
                    console.log("map: create map start");
                    var mapOptions = {
                        zoom: 1,
                        center: new google.maps.LatLng($rootScope.centerLatitude, $rootScope.centerLongitude),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        panControl: true,
                        zoomControl: true,
                        mapTypeControl: true,
                        scaleControl: false,
                        streetViewControl: false,
                        navigationControl: true,
                        disableDefaultUI: true,
                        overviewMapControl: true
                    };

                    if (!(map instanceof google.maps.Map)) {
                        console.log("map: create map now as not already available ");
                        map = new google.maps.Map(element[0], mapOptions);
                        // EDIT Added this and it works on android now
                        // Stop the side bar from dragging when mousedown/tapdown on the map
                        google.maps.event.addDomListener(element[0], 'mousedown', function (e) {
                            e.preventDefault();
                            return false;
                        });
                        infowindow = new google.maps.InfoWindow();
                    }
                }

                scope.$watch('markers', function () {
                    updateMarkers();
                });
                scope.$watch('origin', function () {
                    updateRoute();
                });

                // Info window trigger function
                function onItemClick(pin, label, datum, url) {
                    // Create content
                    var contentString = "Name: " + label + "<br />Time: " + datum;
                    // Replace our Info Window's content and position
                    infowindow.setContent(contentString);
                    infowindow.setPosition(pin.position);
                    infowindow.open(map)
                    google.maps.event.addListener(infowindow, 'closeclick', function () {
                        //console.log("map: info windows close listener triggered ");
                        infowindow.close();
                    });
                }


                function markerCb(marker, member, location) {
                    return function () {
                        //console.log("map: marker listener for " + member.name);
                        var href = "http://maps.apple.com/?q=" + member.lat + "," + member.lon;
                        map.setCenter(location);
                        //onItemClick(member.id);
                        $rootScope.acceptConfirmation(member.id,member.uid)
                    };

                }

                // update map markers to match scope marker collection
                function updateMarkers() {

                    if (map && scope.markers) {
                        // create new markers
                        //console.log("map: make markers ");
                        currentMarkers = [];
                        var markers = scope.markers;

                        if (angular.isString(markers)) markers = scope.$eval(scope.markers);
                        for (var i = 0; i < markers.length; i++) {
                            var m = markers[i];
                            var loc = new google.maps.LatLng(m.lat, m.lon);
                            var mm = new google.maps.Marker({position: loc, map: map});
                            //console.log("map: make marker for " + m.name);
                            google.maps.event.addListener(mm, 'click', markerCb(mm, m, loc));
                            currentMarkers.push(mm);
                        }
                    }
                }
                function updateRoute(){
                    var directionsService = new google.maps.DirectionsService();
                    var directionsDisplay = new google.maps.DirectionsRenderer();

                    var request = {
                        origin : scope.origin,
                        destination : scope.destination,
                        travelMode : google.maps.TravelMode.DRIVING
                    };
                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                        }
                    });

                    directionsDisplay.setMap(map);
                }
                // convert current location to Google maps location
                function getLocation(loc) {
                    if (loc == null) return new google.maps.LatLng(40, -73);
                    if (angular.isString(loc)) loc = scope.$eval(loc);
                    return new google.maps.LatLng(loc.lat, loc.lon);
                }

            } // end of link:
        }; // end of return
    })
    .directive('ngAutocomplete', function () {
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                options: '=?',
                details: '=?'
            },

            link: function (scope, element, attrs, controller) {

                //options for autocomplete
                var opts
                var watchEnter = false
                //convert options provided to opts
                var initOpts = function () {

                    opts = {}
                    if (scope.options) {

                        if (scope.options.watchEnter !== true) {
                            watchEnter = false
                        } else {
                            watchEnter = true
                        }

                        if (scope.options.types) {
                            opts.types = []
                            opts.types.push(scope.options.types)
                            scope.gPlace.setTypes(opts.types)
                        } else {
                            scope.gPlace.setTypes([])
                        }

                        if (scope.options.bounds) {
                            opts.bounds = scope.options.bounds
                            scope.gPlace.setBounds(opts.bounds)
                        } else {
                            scope.gPlace.setBounds(null)
                        }

                        if (scope.options.country) {
                            opts.componentRestrictions = {
                                country: scope.options.country
                            }
                            scope.gPlace.setComponentRestrictions(opts.componentRestrictions)
                        } else {
                            scope.gPlace.setComponentRestrictions(null)
                        }
                    }
                }

                if (scope.gPlace == undefined) {
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                }
                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                    var result = scope.gPlace.getPlace();
                    if (result !== undefined) {
                        if (result.address_components !== undefined) {

                            scope.$apply(function () {

                                scope.details = result;

                                controller.$setViewValue(element.val());
                            });
                        }
                        else {
                            if (watchEnter) {
                                getPlace(result)
                            }
                        }
                    }
                })

                //function to get retrieve the autocompletes first result using the AutocompleteService
                var getPlace = function (result) {
                    var autocompleteService = new google.maps.places.AutocompleteService();
                    if (result.name.length > 0) {
                        autocompleteService.getPlacePredictions(
                            {
                                input: result.name,
                                offset: result.name.length
                            },
                            function listentoresult(list, status) {
                                if (list == null || list.length == 0) {

                                    scope.$apply(function () {
                                        scope.details = null;
                                    });

                                } else {
                                    var placesService = new google.maps.places.PlacesService(element[0]);
                                    placesService.getDetails(
                                        {'reference': list[0].reference},
                                        function detailsresult(detailsResult, placesServiceStatus) {

                                            if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                                scope.$apply(function () {

                                                    controller.$setViewValue(detailsResult.formatted_address);
                                                    element.val(detailsResult.formatted_address);

                                                    scope.details = detailsResult;

                                                    //on focusout the value reverts, need to set it again.
                                                    var watchFocusOut = element.on('focusout', function (event) {
                                                        element.val(detailsResult.formatted_address);
                                                        element.unbind('focusout')
                                                    })

                                                });
                                            }
                                        }
                                    );
                                }
                            });
                    }
                }

                controller.$render = function () {
                    var location = controller.$viewValue;
                    element.val(location);
                };

                //watch options provided to directive
                scope.watchOptions = function () {
                    return scope.options
                };
                scope.$watch(scope.watchOptions, function () {
                    initOpts()
                }, true);

            }
        };
    })