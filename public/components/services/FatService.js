var app = angular.module("CalorieApp");

app.service("FatService", ["$http", function ($http) {
    var self = this;
    this.searchResults = [];
    this.currentFood = {};
    
    this.fatSearch = function (searchTerm) {
        $http.post("/api/fatsecret/search", {search_expression: searchTerm}).then(function(data) {
            console.log(data);
            self.searchResults = data.foods;
        });
    };

    this.getFood = function (id) {
        $http.post("/api/fatsecret/get", {food_id: id}).then(function(data) {
            console.log(data);
            self.searchResults = data.foods;
        });
    };
}]);