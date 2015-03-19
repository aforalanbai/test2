Kinoto/**
 * Ajax services factory
 */
    .factory('ajaxService', function ($http) {
        return {
            /**
             * For ajax Services to connect to server
             * @param page
             * @param datas
             * @returns {*}
             */
            ajax: function (page, datas) {
                return $http({
                    method: 'POST',
                    //url: "http://localhost/HybridApp/Kinoto/Api/" + page,
                    url: 'http://sicsglobal.com/projects/HybridApp/Kinoto/Api/' + page,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: datas
                }).success(function (data) {
                    return data;
                });
            }
        }
    })
/**
 * Factory for validations
 */
    .factory('Validation', function (ajaxService) {
        var value;
        return {
            /**
             * For Null Validations
             * @param data
             * @returns {*}
             * @constructor
             */
            NullValidate: function (data) {
                if (data == '') {
                    value = false;
                } else {
                    value = true;
                }
                return value;
            },
            /**
             * For Email Validation
             * @param data
             * @returns {*}
             * @constructor
             */
            EmailValidate: function (data) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(data) == false) {
                    value = false;
                } else {
                    value = true;
                }
                return value;
            },
            /**
             * For Number Validation
             * @param data
             * @returns {*}
             * @constructor
             */
            NumberValidate: function (data) {
                if (isNaN(data)) {
                    value = false;
                } else {
                    value = true;
                }
                return value;
            },
            /**
             * For confirm validation
             * @param data1
             * @param data2
             * @returns {*}
             * @constructor
             */
            ConfirmValidate: function (data1, data2) {
                if (data1 != data2) {
                    value = false;
                } else {
                    value = true;
                }
                return value;
            },
            /**
             * for date validation
             * @param date1
             * @param date2
             * @returns {*}
             * @constructor
             */
            DateValidate:function(date1,date2){
                if(date2>=date1){
                    value = true;
                }else{
                    value = false;
                }
                return value;
            }


        }
    })

    .filter('lat', function () {
        return function (input, decimals) {
            if (!decimals) decimals = 0;
            input = input * 1;
            var ns = input > 0 ? "N" : "S";
            input = Math.abs(input);
            var deg = Math.floor(input);
            var min = Math.floor((input - deg) * 60);
            var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
            return deg + "°" + min + "'" + sec + '"' + ns;
        }
    })

// formats a number as a longitude (e.g. -80.02... => "80°1'24"W")
    .filter('lon', function () {
        return function (input, decimals) {
            if (!decimals) decimals = 0;
            input = input * 1;
            var ew = input > 0 ? "E" : "W";
            input = Math.abs(input);
            var deg = Math.floor(input);
            var min = Math.floor((input - deg) * 60);
            var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
            return deg + "°" + min + "'" + sec + '"' + ew;
        }
    })


