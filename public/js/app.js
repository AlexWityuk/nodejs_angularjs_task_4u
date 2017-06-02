var app = angular.module("myApp",["ngRoute", "LocalStorageModule", "ui.bootstrap"]);
app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: '/home.html',
            controller: 'MainController'
        })
        .when('/users/:page', {
            templateUrl: '/home.html',
            controller: 'MainController'
        })
        .when('/search/users', {
            templateUrl: '/home.html',
            controller: 'searchController'
        })
        .otherwise({redirectTo: '/'});
});