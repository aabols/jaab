// import express
const express = require("express");

// configuration
const config = require("../config.js");

// parameters
const PORT = process.env.PORT || config.server.port;
const API_ROOT = config.api.path;
const CLIENT_ROOT = config.client.path;

// load routers
const apiRouter = require('./routes/api');
const helloWorldRouter = require('./routes/hello-world');
const clientRouter = require('./routes/client');

// create express app
const app = express();

// use routers
app.use(API_ROOT, apiRouter);
app.use(CLIENT_ROOT, clientRouter);

// launch app
app.listen(
    PORT,
    () => {
        console.log(`Server listening on ${PORT}...`);
    }
);