const jwt = require('jsonwebtoken');
const config = require('../../../config');

const JWT_SECRET_KEY = config.server.jwtKey;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    } catch {}
};