const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log('config.js', process.env.NODE_ENV);

module.exports = {
    env: process.env.NODE_ENV || 'development',
    server: {
        port: process.env.NODE_PORT || 3001,
        root: process.env.NODE_ROOT || '',
        jwtKey: process.env.NODE_JWT_SECRET_KEY || 'pleb'
    },
    development: {
        database: 'jaab-dev-db',
        username: 'root',
        password: 'rootpw',
        host: 'localhost',
        dialect: 'sqlite',
        storage: path.resolve(__dirname, 'dev_db.sqlite3'),
    },
    test: {
        database: process.env.NODE_DB_TEST_NAME,
        username: process.env.NODE_DB_TEST_USERNAME,
        password: process.env.NODE_DB_TEST_PASSWORD,
        host: process.env.NODE_DB_TEST_HOST,
        dialect: process.env.NODE_DB_TEST_DIALECT,
    },
    production: {
        database: process.env.NODE_DB_PRODUCTION_NAME,
        username: process.env.NODE_DB_PRODUCTION_USERNAME,
        password: process.env.NODE_DB_PRODUCTION_PASSWORD,
        host: process.env.NODE_DB_PRODUCTION_HOST,
        dialect: process.env.NODE_DB_PRODUCTION_DIALECT,
    }
};