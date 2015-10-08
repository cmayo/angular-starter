angular.module('starter', ['ui.router','templates','ngResource','ui.bootstrap', 'ngSanitize'])

    .constant('RESOURCES', {})

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider

            .state('app', {
                abstract: true,
                templateUrl: "menu.html",
                controller: 'AppController'
            })

            .state('app.home', {
                url: "/app/home",
                views: {
                    'mainContent' :{
                        controller: 'HomeController',
                        templateUrl: "home.html"
                    }
                }
            })
        ;

        $urlRouterProvider.otherwise('/app/home');

    })

    .run(function ($window,$rootScope,$location) {


    })




