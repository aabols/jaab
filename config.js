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
            storage: './dev_db.sqlite3'
        },
        test: {},
        production: {}
    }
};