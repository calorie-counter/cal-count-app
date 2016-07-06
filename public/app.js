var app = angular.module("CalorieApp", ["ngRoute", "CalorieApp.Auth", "ui.bootstrap"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/welcome/welcome.html",
            controller: "WelcomeController"
        })
        .when("/add", {
            templateUrl: "components/add/add.html",
            controller: "AddController",
            resolve: {
                factory: loggedIn
            }
        })
        .when("/profile", {
            templateUrl: "components/profile/profile.html",
            controller: "ProfileController",
            resolve: {
                factory: loggedIn
            }
        })
        .when("/track", {
            templateUrl: "components/track/track.html",
            controller: "TrackController",
            resolve: {
                factory: loggedIn
            }
        })  
        .otherwise({
            redirectTo: "/"
        });
});

var loggedIn = function ($q, $location, UserService) {
    var defer = $q.defer();
    if (UserService.isAuthenticated()) {
        defer.resolve(true);
    } else {
        defer.reject("not logged in")
        $location.path("/")
    }
}