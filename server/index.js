// import express
const express = require("express");

// import standard middleware
const bodyParser = require('body-parser');

// configuration
const config = require("../config.js");

// parameters
const PORT = config.server.port;

// load routers
const apiRouter = require('./routes/api');
const clientRouter = require('./routes/client');

// create express app
const app = express();

// use middleware
app.use(bodyParser.json());

// use routers
app.use('/api', apiRouter);
app.use('/', clientRouter);

// import ORM
const sequelize = require('../db');

// synchronise ORM
sequelize.sync({ force: true });

// function to call when server starts
const onServerStart = () => {
    console.log(`Server listening on ${PORT}...`);
};

// launch app
app.listen(PORT, onServerStart);