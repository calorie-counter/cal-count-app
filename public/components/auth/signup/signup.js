var app = angular.module("CalorieApp.Auth");

app.controller("signupCtrl", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {
    $scope.passwordMessage = "";

    $scope.signup = function (user) {
        if (user.password != $scope.passwordRepeat) {
            $scope.passwordMessage = "Passwords must match!";
            return alert($scope.passwordMessage);
        } else {
            UserService.signup(user).then(function (response) {
                $location.path("/login");
            }, function (response) {
                alert("There has been a problem: " + response.data.message);
            });
        }
    }
}]);