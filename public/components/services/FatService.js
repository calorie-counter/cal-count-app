var app = angular.module("CalorieApp");

app.service("FatService", ["$http", function ($http) {
    var self = this;
    this.searchResults = [];
    this.currentFood = {};
    
    this.fatSearch = function (searchTerm) {
        $http.post("/api/fatsecret/search", searchTerm).then(function(res) {
            console.log(res);
            console.log(res.data);
            console.log(res.response);
            self.searchResults = res.data.foods;
        });
    };

    this.getFood = function (id) {
        $http.post("/api/fatsecret/get", id).then(function(res) {
            console.log(res);
            console.log(res.data);
            console.log(res.response);
            self.searchResults = res.data.foods;
        });
    };
}]);