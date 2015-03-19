Kinoto.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/template/home.html",
            controller: 'HomeCtrl'
        })
        .state('register',{
            url:'/register',
            templateUrl:"templates/template/registration.html",
            controller:'RegisterCtrl'
        })
        .state('registerSelect',{
            url:'/registerSelect',
            templateUrl:"templates/template/registerSelect.html",
            controller:'RegisterSelectCtrl'
        })
        .state('signIn',{
            url:'/signIn',
            templateUrl:"templates/template/signIn.html",
            controller:'signInCtrl'
        })
        .state('driverEntry',{
            url:'/driverEntry',
            templateUrl:"templates/template/driverEntry.html",
            controller:'DriverEntryCtrl'
        })
        .state('senderEntry',{
            url:'/senderEntry',
            templateUrl:"templates/template/senderEntry.html",
            controller:'SenderEntryCtrl'
        })
        .state('menu', {
            url: "/menu",
            abstract: true,
            templateUrl: "templates/template/menu.html"
        })
      /*  .state('confirmationOrder',{
            url:'/confirmationOrder',
            templateUrl:"templates/template/confirmationOrder.html",
            controller:'ConfirmationOrderCtrl'
        })*/
        .state('menu.confirmationOrder', {
            url: "/confirmationOrder",
            views: {
                'menuContent' :{
                    templateUrl:"templates/template/confirmationOrder.html",
                    controller:'ConfirmationOrderCtrl'
                }
            }
        })
        .state('menu.detailMap', {
            url: "/detailMap",
            views: {
                'menuContent' :{
                    templateUrl:"templates/template/detailMap.html",
                    controller:'DetailMapCtrl'
                }
            }
        })
        .state('menu.senderOrderInfo', {
            url: "/senderOrderInfo",
            views: {
                'menuContent' :{
                    templateUrl:"templates/template/senderOrderInfo.html",
                    controller:'SenderOrderInfoCtrl'
                }
            }
        })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
    $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
    $ionicConfigProvider.views.transition('platform');

});

