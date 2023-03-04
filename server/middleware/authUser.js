const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../db/models');

const JWT_SECRET_KEY = config.server.jwtKey;

module.exports = async (req, res, next) => {
    let user = null;
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
        user = await User.scope('auth').findOne({ where: { username: decodedToken.username } });
    } catch (err) {
        //console.log(err);
    } finally {
        req.user = user;
        next();
    };
};