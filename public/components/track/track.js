var app = angular.module("CalorieApp");


app.controller("TrackController", ["$scope", "FoodService", function ($scope, FoodService) {
    $scope.foodService = FoodService;
    $scope.tabName = "day";
    $scope.i = -1;   

    $scope.checkDate = function () {
        $scope.foodService.getFoods($scope.tabName);
    }
    
    $scope.set = function (index) {
       $scope.i = index;
       console.log($scope.i);
        console.log(index);
    }
    
}]);