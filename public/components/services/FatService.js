var app = angular.module("CalorieApp");

app.service("FatService", ["$http", function ($http) {
    var self = this;
    this.searchResults = [];
    this.currentFood = {};
    
    this.fatSearch = function (searchTerm) {
        $http.post("/api/fatsecret/search", {search_expression: searchTerm}).then(function(data) {
            console.log(data);
            self.searchResults = data.data.list.item;
        });
    };

    this.getFood = function (id) {
        $http.post("/api/fatsecret/get", {food_id: id}).then(function(data) {
            console.log(data);
            self.currentFood.name = data.data.report.food.name;
            self.currentFood.ndbno = data.data.report.food.ndbno;
            self.currentFood.food_group = data.data.report.food.fg;
            var nutrients = data.data.report.food.nutrients;
            nutrients.forEach(function(el, i, arr) {
                if (el.nutrient_id === 208) self.currentFood.calories = el.value;
                if (el.nutrient_id === 204) self.currentFood.fat = el.value;
                if (el.nutrient_id === 203) self.currentFood.protein = el.value;
                if (el.nutrient_id === 205) self.currentFood.carbohydrate = el.value;
                if (el.nutrient_id === 307) self.currentFood.sodium = el.value;
                if (el.nutrient_id === 601) self.currentFood.cholesterol = el.value;
            });
            console.log(self.currentFood);
        });
        console.log(self.currentFood);
    };
}]);