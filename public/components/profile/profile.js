/*Make and link controller*/

var app = angular.module("CalorieApp");

app.controller("ProfileController", ["$scope", "UserService", function ($scope, UserService) {
    $scope.UserService = UserService;
}]);

app.filter("inches", function () {
    return function (input) {
        return input + " in.";
    };
});

app.filter("pounds", function () {
    return function (input) {
        return input + " lbs.";
    };
});

app.filter("kCal", function () {
    return function (input) {
        return input + " kCal.";
    };
});