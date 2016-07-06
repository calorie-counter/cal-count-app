var express = require("express");
var foodRouter = express.Router();
var Food = require("../models/food");

foodRouter.route("/")
    .get(function (req, res) {
        if (req.query.day) {
            Food.find({user: req.user._id, day: req.query.day, month: req.query.month, year: req.query.year}, function (err, foods) {
                if (err) res.status(500).send(err);
                else res.send(foods);
            });
        } else if (req.query.month) {
            Food.find({user: req.user._id, month: req.query.month, year: req.query.year}, function (err, foods) {
                if (err) res.status(500).send(err);
                else res.send(foods);
            });
        } else {
            Food.find({user: req.user._id, year: req.query.year}, function (err, foods) {
                if (err) res.status(500).send(err);
                else res.send(foods);
            });
        }
        
    })
    .post(function (req, res) {
        var newFood = new Food(req.body);
        newFood.user = req.user._id;
        newFood.save(function(err, user) {
            if(err) res.status(500).send(err);
            else res.status(201).send(user);
        });
});

foodRouter.route("/:foodId")
    .get(function (req, res) {
        Food.findOne({_id: req.params.foodId, user: req.user._id}, function (err, food) {
            if (err) res.status(500).send(err);
            else res.send(food);
        });
    })
    .put(function (req, res) {
        Food.findOneAndUpdate({_id: req.params.foodId, user: req.user._id}, req.body, {new:true}, function(err, food) {
            if (err) res.send(500).send(err);
            else res.send(food);
        });
    })
    .delete(function (req, res) {
        Food.findOneAndRemove({_id: req.params.foodId, user: req.user._id}, function(err, food) {
            if (err) res.status(500).send(err);
            else res.send(food);
        });
    });

module.exports = foodRouter;
