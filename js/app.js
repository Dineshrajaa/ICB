// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'icb.controllers', 'icb.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


    /* .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })*/
    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'nameCtrl'
    })

    // Each tab has its own nav history stack:

    .state('tab.customers', {
        url: '/customers',
        views: {
            'tab-customers': {
                templateUrl: 'templates/tab-customers.html',
                controller: 'customersCtrl'
            }
        }
    })

    .state('tab.products', {
            url: '/products',
            views: {
                'tab-products': {
                    templateUrl: 'templates/tab-products.html',
                    controller: 'productsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

    .state('tab.bills', {
        url: '/bills',
        views: {
            'tab-bills': {
                templateUrl: 'templates/tab-bills.html'
                    //controller: 'billsCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/customers');

});
