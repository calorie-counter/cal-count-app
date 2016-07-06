var app = angular.module("CalorieApp");


app.controller("TrackController", ["$scope", "FoodService", function ($scope, FoodService) {
    //getfood function
    $scope.foodService = FoodService;
    $scope.tabName = "day";
    $scope.i = -1;
    /*
    for the day:    getDate() [also returns from 0-6]
    for the month:  getMonth() [REMEBER: returns a number from 0-11]
    for the year:   getFullYear()
    var currentDate  = new Date()
    var day = currentDate.getDate()
    */

    //    $scope.trackFoodDay = function(){
    //        var date = {
    //            day: viewerDate.date,
    //            month: viewerDate.month,
    //            year: viewerDate.year
    //        }
    //        FoodService.getFoods(date).then(function(response){
    //            response.data
    //        })
    //    }
    //     


    $scope.checkDate = function () {
        $scope.foodService.getFoods($scope.tabName);
    }
    $scope.set = function (index) {
       $scope.i = index;
       console.log($scope.i);
        console.log(index);
    }
    $scope.click = function () {
        console.log($scope.foodService.currentDate);
        
    }
    
}]);