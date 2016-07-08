var app = angular.module("CalorieApp");

app.controller("AddController", ["$scope", "FatService", "FoodService", "$location", function ($scope, FatService, FoodService, $location) {
    $scope.FatService = FatService;
    $scope.FoodService = FoodService;
    $scope.addView = 'search';
    
    $scope.select = function (id) {
        $scope.addView = 'save';
        $scope.FatService.getFood(id);   
    }
    $scope.save = function () {
        $scope.FoodService.addFood($scope.FatService.currentFood);
        $location.path("/");
    }
}]);