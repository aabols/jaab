// configure environment variables
require('dotenv').config();

module.exports = {
    server: {
        port: process.env.PORT || 3001,
        jwtKey: process.env.JWT_SECRET_KEY || 'pleb'
    },
    db: {
        development: {
            database: 'jaab-dev-db',
            username: 'root',
            password: 'rootpw',
            host: 'localhost',
            dialect: 'sqlite',
            storage: './dev_db.sqlite3',
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
    }
};