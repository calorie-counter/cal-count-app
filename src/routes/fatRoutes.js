var express = require("express");
var fatRouter = express.Router();
var rest = require("restler");
var crypto = require("crypto");

var apiKey = "40a95beb5d134a4aa81ec584486a23d9",
    fatSecretRestUrl = "http://platform.fatsecret.com/rest/server.api",
    sharedSecret = "c779145a3cc84bbc8820e336def62a37",
    date1 = new Date;

var searchReqObj = {
    format: 'json',
    method: 'foods.search',
    oauth_consumer_key: apiKey,
    oauth_nonce: Math.random().toString(36).replace(/[^a-z]/, '').substr(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(date1.getTime() / 1000),
    oauth_version: '1.0',
    search_expression: 'banana' // test query
};
var getReqObj = {
    food_id: 0,
    format: 'json',
    method: 'foods.get',
    oauth_consumer_key: apiKey,
    oauth_nonce: Math.random().toString(36).replace(/[^a-z]/, '').substr(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(date.getTime() / 1000),
    oauth_version: '1.0',
    search_expression: ""
};

function sign(reqObj, item) {
    // add dynamic search_expression and food_id values
    if (reqObj.method === 'food.search') reqObj.search_expression = item;
    else if (reqObj.method === 'food.get') reqObj.food_id = item;
    
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
        res.send({data: data, response: response})
    });
});


fatRouter.post("/get", function (req, res) {
    //GET
    rest.post(fatSecretRestUrl, {
        data: sign(getReqObj, req.body.food_id)
    }).on('complete', function (data, response) {
//        console.log(response);
//        console.log("DATA: " + data + "\n");
        res.send({data: data, response: response})
    });
});

module.exports = fatRouter;