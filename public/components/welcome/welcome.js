var app = angular.module("CalorieApp");

app.controller("WelcomeController", ["$scope", "UserService", function($scope, UserService) {
    $scope.userService = UserService;
}]);