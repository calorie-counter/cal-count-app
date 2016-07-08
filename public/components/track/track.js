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
        var getProgress = function () {
            var kCal = 0;
            for (var i = 0; i < foodList.length; i++) {
                kCal += foodList[i].calories;
            }
            return kCal
        }
        var goal = UserService.currentUser.goal;
        var now = getProgress();
        
        $scope.i = index;
        $scope.progress = {
            goal : goal,
            now : now,
            percent : Math.round(now / goal *100);
        }
    }

}]);