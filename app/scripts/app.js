'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
    .module('yapp', [
        'ui.router',
        'ui.bootstrap',
        'snap',
        'ngStorage',
        'ngAnimate',
        'restangular',
        'ngMap'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.when('/dashboard/', '/dashboard/overview');
        //$urlRouterProvider.otherwise('/login');

        RestangularProvider.setBaseUrl("http://localhost:3000/");

        $stateProvider
            .state('base', {
                abstract: true,
                url: '',
                templateUrl: 'views/base.html'
            })
            .state('login', {
                url: '/login/',
                parent: 'base',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('redirect', {
                url: '/redirect/?code',
                parent: 'base',
                templateUrl: 'views/dashboard.html',
                controller: 'RedirectCtrl'
            }
        )
            .state('dashboard', {
                url: '/dashboard',
                parent: 'base',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .state('overview', {
                url: '/overview',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/overview.html'
            })
            .state('reports', {
                url: '/reports',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/reports.html'
            });

    });
