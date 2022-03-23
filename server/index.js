// import express
const express = require("express");

// import configuration
const config = require("../config.js");

// set parameters
const PORT = process.env.PORT || config.server.port;
const API_ROOT = config.api.path;

// load routers
const apiRouter = require('./routes/api');
const helloWorldRouter = require('./routes/hello-world');
const clientRouter = require('./routes/client');

// create express app
const app = express();

// use routers
app.use(API_ROOT, apiRouter);
app.use("/", clientRouter);

// launch app
app.listen(
    PORT,
    () => {
        console.log(`Server listening on ${PORT}...`);
    }
);