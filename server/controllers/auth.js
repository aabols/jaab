const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../config');
const User = require('../db/models/User');

const JWT_SECRET_KEY = config.server.jwtKey;

const loginUser = async (req, res) => {
    try {
        const userWithPassword = await User.scope('withPassword').findOne({ where: { email: req.body.email }});
        if (userWithPassword === null) {
            res.status(404).json({ message: 'User not found' });
            return;
        };

        const passwordsMatch = await bcrypt.compare(req.body.password, userWithPassword.password);
        if (!passwordsMatch) {
            res.status(404).json({ message: 'Password incorrect' });
            return;
        };

        const user = await User.scope('jwt').findByPk(userWithPassword.id).then(user => user.toJSON());
        const token = jwt.sign(user, JWT_SECRET_KEY);
        res.json({
            ...user,
            token
        });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    loginUser
};