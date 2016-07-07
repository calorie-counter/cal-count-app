var express = require("express");
var fatRouter = express.Router();
var rest = require("restler");
var crypto = require("crypto");
var parseString = require('xml2js').parseString;

var apiKey = "40a95beb5d134a4aa81ec584486a23d9",
    fatSecretRestUrl = "http://platform.fatsecret.com/rest/server.api",
    sharedSecret = "c779145a3cc84bbc8820e336def62a37";

var searchReqObj = {
//    format: 'json',
    method: 'foods.search',
    oauth_consumer_key: apiKey,
    oauth_nonce: Math.random().toString(36).replace(/[^a-z]/, '').substr(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: 0,
    oauth_version: '1.0',
    search_expression: ''
};
var getReqObj = {
    food_id: 0,
//    format: 'json',
    method: 'foods.get',
    oauth_consumer_key: apiKey,
    oauth_nonce: Math.random().toString(36).replace(/[^a-z]/, '').substr(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: 0,
    oauth_version: '1.0',
    search_expression: ''
};

function sign(reqObj, item) {
    // add dynamic search_expression and food_id values
    if (reqObj.method === 'foods.search') {
        reqObj.search_expression = item;
        console.log("hello")
    } else if (reqObj.method === 'foods.get') reqObj.food_id = item;
    
    //Set a new timestamp
    var date = new Date;
    reqObj.oauth_timestamp = Math.floor(date.getTime() / 1000)

    // construct a param=value& string and uriEncode
    var paramsStr = '';
    for (var i in reqObj) {
        paramsStr += "&" + i + "=" + reqObj[i];
    }

    // yank off that first "&"
    paramsStr = paramsStr.substr(1);

    var sigBaseStr = "POST&" + encodeURIComponent(fatSecretRestUrl) + "&" + encodeURIComponent(paramsStr);

    // no  Access Token token (there's no user .. we're just calling foods.search)
    sharedSecret += "&";

    var hashedBaseStr = crypto.createHmac('sha1', sharedSecret).update(sigBaseStr).digest('base64');

    // Add oauth_signature to the request object
    reqObj.oauth_signature = hashedBaseStr;

    return reqObj;
}

// Launch!

fatRouter.post("/search", function (req, res) {
    //SEARCH
    rest.post(fatSecretRestUrl, {
        data: sign(searchReqObj, req.body.search_expression)
    }).on('complete', function (data, response) {
//        console.log(response);
//        console.log("DATA: " + data + "\n");
        parseString(data, function(err, result) {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            } else res.send(result);
        });
    });
});


fatRouter.post("/get", function (req, res) {
    //GET
    rest.post(fatSecretRestUrl, {
        data: sign(getReqObj, req.body.food_id)
    }).on('complete', function (data, response) {
//        console.log(response);
//        console.log("DATA: " + data + "\n");
        parseString(data, function(err, result) {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            } else res.send(result);
        });
    });
});

module.exports = fatRouter;