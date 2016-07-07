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
var concat = function (object) {
    var keys = Object.keys(object).sort();
    var concatString = "";
    for (var i = 0; i < keys.length; i++) {
        if (i === 0) {
            concatString += keys[i] + "=" + object[keys[i]];
        } else {
            concatString += "&" + keys[i] + "=" + object[keys[i]];
        }
    }
    return concatString;
};

// Launch!

fatRouter.post("/search", function (req, res) {
    //SEARCH
    searchReqObj.q = req.body.search_expression;
    rest.get(reqeustURL + "search/" + uri, {
        query: searchReqObj
    }).on('complete', function (data, response) {
        //        console.log(response);
        //        console.log("DATA: " + data + "\n");
        res.send(data);
    });
});


fatRouter.post("/get", function (req, res) {
    //GET
    getReqObj.ndbno = req.body.food_id;
    rest.get(fatSecretRestUrl = "ndb/reports/", {
        query: getReqObj
    }).on('complete', function (data, response) {
        //        console.log(response);
        //        console.log("DATA: " + data + "\n");
        res.send(data);
    });
});

module.exports = fatRouter;