const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const clientRouter = require('./routes/client');
const apiRouter = require('./routes/api');
const config = require('../config.js');
const sequelize = require('../db');


const app = express();
const PORT = config.server.port;

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

// ROUTERS
app.use('/api', apiRouter);
app.use('/', clientRouter);


sequelize.sync({ force: true });

function onServerStart() { console.log(`Server listening on ${PORT}...`) };

app.listen(PORT, onServerStart);