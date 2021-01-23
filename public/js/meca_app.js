var meca_app = angular.module('meca', ['ngRoute', 'ngResource']);

meca_app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    }).when('/logout', {
        resolve: {
            deadResolve: function ($location, UserModel) {
                UserModel.clearData();
                location.path('/home');
            }
        }
    })
    .when('/profile', {
        resolve: {
            check: function ($location, UserModel) {
                if (!UserModel.isUserLoggedIn()) {
                    $location.path('/login');
                }
            },
        },
        templateUrl: 'templates/profile.html',
        controller: 'ProfileController'
    })
    .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    })
    .when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    })
    .when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    })
    .otherwise({ 
        templateUrl: 'templates/404.html',
    });

    $locationProvider.html5Mode(true);
});
