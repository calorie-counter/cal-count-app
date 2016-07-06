var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var foodSchema = new Schema({
    food_id: {
        type: Number,
        required: true
    },
    food_name: {
        type: String,
        required: true
    },
    food_type: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    carbohydrate: {
        type: Number,
        required: true
    },
    sodium: {
        type: Number,
        required: true
    },
    cholesterol: {
        type: Number,
        required: true
    },
    brand_name: String,
    serving_id: {
        type: String,
        required: true
    },
    serving_description: {
        type: String,
        required: true
    },
    metric_serving_amount: {
        type: Number,
        required: true
    },
    metric_serving_unit: {
        type: Number,
        required: true
    },
    number_of_units: {
        type: Number,
        required: true
    },
    measurement_description: {
        type: String,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    nutrition_toggle: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Food", foodSchema)







//    "food_id": 12345,
//    "food_name": "Beef",
//    "food_type": "generic",
//    "calories": 300,
//    "fat": 1,
//    "protein": 1,
//    "carbohydrate": 1,
//    "sodium": 80,
//    "cholesterol": 60
//    "brand_name": ,
//    "serving_id": 12345,
//    "serving_description": "gram",
//    "metric_serving_amount": 1,
//    "metric_serving_unit": "g",
//    "number_of_units": 4,
//    "measurement_description": "4g",
//    "servings": 1,
//    "day": 2,
//    "month": 2,
//    "year": 2016,
//    "user": "577bcee74983fe12044f762a"