"use strict";

var bodyParser = require("body-parser");
var cors = require("cors");
var crypto = require("crypto");
var express = require("express");
var fs = require("fs");
var https = require("https");
var HavenRPCProvider = require("./lib/haven-rpc-provider.js");

// Create a new RPC provider
const rpc = new HavenRPCProvider();

// Create a new instance of express
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route that receives a POST request to /incoming
app.post("/rpc", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Content-Type", "application/json");

  if (req.method != "POST") {
    res.send(req.body);
    return;
  }

  // Take a modifiable copy of the request body
  var objRPCRequest = req.body;

  // HERE BE DRAGONS!!!
  // Queue the request and response objects, so that we can serialise access to the haven-wallet-rpc instance
  rpc
    ._queueRequest(objRPCRequest)
    .then(function(result) {
      console.log(result);
      res.send({ status: "ok", result: result });
    })
    .catch(function(err) {
      console.error(err);
      res.send({ status: "error", error: err });
    });
  // LAND AHOY!!!
});

// Tell our app to listen on port 3000
https
  .createServer(
    {
      key: fs.readFileSync("keys/server_key.pem"),
      cert: fs.readFileSync("keys/server_cert.pem")
    },
    app
  )
  .listen(port, function(err) {
    if (err) {
      throw err;
    }

    console.log("Server started on port " + port);
  });
/*
app.listen(port, function (err) {
        if (err) {
            throw err
        }

        console.log('Server started on port ' + port)
    });
*/
