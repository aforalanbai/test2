// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var Kinoto = angular.module('starter', ['ionic'])

    .run(function ($ionicPlatform,$rootScope,$ionicPopup,$state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        $rootScope.showAlert=function(messageTitle,messageContent,messageClass){
            $ionicPopup.alert({
                title: messageTitle,
                template: messageContent,
                cssClass: messageClass
            });
        }
        $rootScope.goToSignIn=function(){
            $state.go('signIn')
        }
        $rootScope.forgotPassword=function(){

        }
        $rootScope.goToSignUp=function(){
            $state.go('registerSelect');
        }
        /**
         * variable for defining the user type
         * 0 for user/customer
         * 1 for driver/cab taker
         * @type {string}
         */
        $rootScope.userType='';
        $rootScope.centerLatitude='';
        $rootScope.centerLongitude='';
        $rootScope.senderId='';
        $rootScope.senderConfirm='';
        $rootScope.senderLocations=[];
        $rootScope.Map=[];
        $rootScope.markers='';
        $rootScope.senderUid='';

        $rootScope.Logout=function(){
            localStorage.setItem('uid','');
            localStorage.setItem('userName','');
            $state.go('home');
        }
        $rootScope.acceptConfirmation=function(id,uid){
            $rootScope.senderId=id;
            $rootScope.senderUid=uid;
            $state.go('menu.senderOrderInfo');
        }
    })


