var express = require("express");
var fatRouter = express.Router();
var rest = require("restler");
var crypto = require("crypto");

var apiKey = "40a95beb5d134a4aa81ec584486a23d9",
    fatSecretRestUrl = "http://platform.fatsecret.com/rest/server.api",
    sharedSecret = "c779145a3cc84bbc8820e336def62a37",
    date = new Date;

var searchReqObj = {
    format: 'json',
    method: 'foods.search',
    oauth_consumer_key: apiKey,
    oauth_nonce: Math.random().toString(36).replace(/[^a-z]/, '').substr(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(date.getTime() / 1000),
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
    search_expression: 'banana' // test query
};

// construct a param=value& string and uriEncode
var paramsStr = '';
for (var i in reqObj) {
  paramsStr += "&" + i + "=" + reqObj[i];
}
