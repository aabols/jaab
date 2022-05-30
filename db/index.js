// import sequelize
const Sequelize = require('sequelize');

// determine environment type
const env = process.env.NODE_ENV || 'development';

// import DB config
const config = require('../config.js').db[env];

// create a sequelize instance
const sequelize = new Sequelize(config);

module.exports = sequelize;