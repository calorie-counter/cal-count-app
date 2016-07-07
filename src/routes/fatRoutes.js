var express = require("express");
var fatRouter = express.Router();
var rest = require("restler");

var reqeustURL = "http://api.nal.usda.gov/"

var searchReqObj = {
    api_key: "T11UeXOU7qG5Hu0X1anIZzAnUsYMOt4OOZIFjB8C",
    q: "",
    sort: "r",
    format: "json"
};

var getReqObj = {
    api_key: "T11UeXOU7qG5Hu0X1anIZzAnUsYMOt4OOZIFjB8C",
    ndbno: 0,
    type: "b",
    format: "json"
}

// Launch!

fatRouter.post("/search", function (req, res) {
    //SEARCH
    searchReqObj.q = req.body.search_expression;
    rest.get(reqeustURL + "search/", {
        params: searchReqObj
    }).on('complete', function (data, response) {
//        console.log(response);
//        console.log("DATA: " + data + "\n");
        res.send(data);
    });
});


fatRouter.post("/get", function (req, res) {
    //GET
    getReqObj.ndbno = req.body.food_id;
    rest.get(fatSecretRestUrl = "ndb/", {
        params: getReqObj
    }).on('complete', function (data, response) {
//        console.log(response);
//        console.log("DATA: " + data + "\n");
       res.send(data);
    });
});

module.exports = fatRouter;