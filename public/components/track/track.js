var app = angular.module("CalorieApp");


app.controller("TrackController", ["$scope", "FoodService", "UserService", function ($scope, FoodService, UserService) {
    $scope.foodService = FoodService;
    $scope.tabName = "day";
    $scope.i = -1;   

    $scope.checkDate = function () {
        $scope.foodService.getFoods($scope.tabName);
    }
    
    $scope.set = function (index) {
        var foodList = $scope.foodService.foodList;
        var now = function (array) {
            var kCal = 0;
            for (var i = 0; i < foodList.length; i++) {
                kCal += foodList[i].calories;
            }
            return kCal
        }
       $scope.i = index;
       Sscope.progress = {
           goal: UserService.currentUser.goal,
           now: now(foodList),
           percent: Math.round(this.now / this.goal * 100)
       }
    }
    
}]);