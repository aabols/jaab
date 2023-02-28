const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config.js');
const sequelize = require('./db');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const apiRouter = require('./routes/api');
const clientRouter = require('./routes/client');
const authUser = require('./middleware/authUser');
const onlyAuthUsers = require('./middleware/onlyAuthUsers');

const app = express();
const PORT = config.server.port;

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(authUser);

// HOMEPAGE
const homepage = '/testlists';

// ROUTES
app.use(`${homepage}/register`, registerRouter);
app.use(`${homepage}/login`, loginRouter);
app.use(`${homepage}/api`, onlyAuthUsers, apiRouter);
app.use(`${homepage}/`, clientRouter);

sequelize.sync({ force: false });

const logPort = () => {
    console.log(`Server listening on ${PORT}...`)
};

app.listen(PORT, logPort);