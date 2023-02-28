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
const homepage = config.server.root;

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(authUser);

// ROUTES
const root = express.Router();
root.use('/register', registerRouter);
root.use('/login', loginRouter);
root.use('/api', onlyAuthUsers, apiRouter);
root.use('/', clientRouter);
app.use(homepage, root);

sequelize.sync({ force: false });

const logPort = () => {
    console.log(`Server listening on ${PORT}...`)
};

app.listen(PORT, logPort);