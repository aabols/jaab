const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');
const { User } = require('../db/models');

const JWT_SECRET_KEY = config.server.jwtKey;

module.exports = {
    loginUser: async (req, res) => {
        try {
            const user = await User.unscoped().findOne({ where: { username: req.body.username } });
            if (!user) throw { status: 404, message: 'User not found' };

            const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordsMatch) throw { status: 404, message: 'Incorrect password' };

            const jwtBody = {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            };
            const token = jwt.sign(jwtBody, JWT_SECRET_KEY);
            res.json({
                ...jwtBody,
                token
            });
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    loginUserLegacy: async (req, res) => {
        try {
            const user = await User.unscoped().findOne({ where: { username: req.body.username } });
            if (!user) throw { status: 404, message: 'User not found' };

            if (user.legacy) {
                const legacyTokenRes = await axios.post(
                    'http://localhost:8069/legacy/api/login.php',
                    {
                        username: req.body.username,
                        pin: req.body.password,
                    }
                );
                if (!legacyTokenRes) throw { status: 404, message: 'Incorrect password' };
                const legacyToken = legacyTokenRes.data;
                if (!legacyToken) throw { status: 404, message: 'Incorrect password' };
                res.json({
                    user: { name: user.username },
                    token: legacyToken,
                });
                return;
            }

            const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordsMatch) throw { status: 404, message: 'Incorrect password' };

            const jwtBody = {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            };
            const token = jwt.sign(jwtBody, JWT_SECRET_KEY);
            res.json({
                ...jwtBody,
                token
            });
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },
};
