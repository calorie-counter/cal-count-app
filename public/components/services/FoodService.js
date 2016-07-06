var app = angular.module("CalorieApp");

app.service("FoodService", ["$http", function($http) {
    var self = this; 
    this.foodList = [];
    this.food = {}; 
    this.currentDate = {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    };
    
    this.getFoods = function(tab) {
        var date = self.currentDate;
        if (tab === "year") {
            delete date.month;
            delete date.day;
        } else if (tab === "month") delete date.day;
        $http.get("/api/foods", {params: date}).then(function(response) {
            self.foodList = response.data; 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText); 
        });
    };
    
    this.getFood = function(food) {
        return $http.get("/api/foods/" + food._id).then(function(response) {
            self.food = response.data; 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };
    
    this.addFood = function(food) {
        return $http.post("/api/foods", food).then(function(response) {
            self.foodList.push(response.data); 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };
    
    this.deleteFood = function(index, food) {
        return $http.delete("/api/foods/" + food._id).then(function(response) {
            self.foodList.splice(index, 1); 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };
    
    this.updateFood = function(index, food) {
        return $http.put("/api/foods/" + food._id, food).then(function(response) {
            self.foodList[index] = response.data; 
        }, function(response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };
    
}]);