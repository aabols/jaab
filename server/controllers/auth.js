const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../config');
const User = require('../../db/models/user');

const JWT_SECRET_KEY = config.server.jwtKey;

const loginUser = async (req, res) => {
    try {
        const userWithPassword = await User.scope('withPassword').findOne({ where: { username: req.body.username }});
        if (userWithPassword === null) {
            res.status(404).json({ message: 'Username not found' });
            return;
        };

        const passwordsMatch = await bcrypt.compare(req.body.password, userWithPassword.password);
        if (!passwordsMatch) {
            res.status(404).json({ message: 'Password incorrect' });
            return;
        };

        const user = await User.scope('jwt').findByPk(userWithPassword.id);
        const token = jwt.sign(user.toJSON(), JWT_SECRET_KEY);
        res.json({ token });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    loginUser
};