const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../db/models/User');

const JWT_SECRET_KEY = config.server.jwtKey;

module.exports = {
    loginUser: async (req, res) => {
        try {
            const userWithPassword = await User.scope('auth').findOne({ where: { username: req.body.username } });
            if (!userWithPassword) throw { status: 404, message: 'User not found' };

            const passwordsMatch = await bcrypt.compare(req.body.password, userWithPassword.password);
            if (!passwordsMatch) throw { status: 404, message: 'Password incorrect' };

            const user = await User.scope('jwt').findByPk(userWithPassword.id).then(user => user.toJSON());
            const token = jwt.sign(user, JWT_SECRET_KEY);
            res.json({
                ...user,
                token
            });
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    }
};