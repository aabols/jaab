const Sequelize = require('sequelize');

const config = require('../config.js');

const env = config.env;
const db = config.db[env];
const sequelize = new Sequelize(db);

module.exports = sequelize;