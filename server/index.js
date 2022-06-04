const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('../config.js');
const sequelize = require('../db');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const apiRouter = require('./routes/api');
const clientRouter = require('./routes/client');
const auth = require('./middleware/auth');


const app = express();
const PORT = config.server.port;

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(auth);

// ROUTES
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/api', apiRouter);
app.use('/', clientRouter);


sequelize.sync({ force: true });

function logPort() { console.log(`Server listening on ${PORT}...`) };

app.listen(PORT, logPort);