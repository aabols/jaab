const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('../config');
const JWT_SECRET_KEY = config.server.jwtKey;
const { User, Sequelize: { Op } } = require('../db/models');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const query = req.query.q;
            if (!query) throw { status: 400, message: 'Missing search query' };
            const users = await User.findAll({
                limit: 10,
                where: {
                    [Op.or]: [
                        { username: { [Op.substring]: query } },
                        { firstName: { [Op.substring]: query } },
                        { lastName: { [Op.substring]: query } },
                    ],
                    id: { [Op.ne]: req.user.id }
                }
            });
            res.json(users);
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    addUser: async (req, res) => {
        try {
            const { username, ...rest } = req.body;
            const [user, created] = await User.findOrCreate({
                where: { username },
                defaults: rest,
            });
            if (!created) throw { status: 409, message: 'Username already in use' };
            const { firstName, lastName } = user.toJSON();
            res.status(201).json({ username, firstName, lastName });
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        }
    },

    migrateUser: async (req, res) => {
        try {
            const { user: { username, ...rest }, legacyUser: { token, user: { name: legacyUsername } } } = req.body;
            try {
                await axios.post(
                    'http://localhost:8069/legacy/api/validate.php',
                    { token }
                );
            } catch (err) {
                throw { status: 401, message: 'Unauthorized' };
            }
            const legacyUser = await User.scope('auth').findOne({
                where: { username: legacyUsername, legacy: true },
            });
            if (!legacyUser) throw { status: 404, message: 'Old account not found' };
            let user;
            let newToken;
            if (username === legacyUsername) {
                legacyUser.set({ ...rest, legacy: false });
                await legacyUser.save({ fields: ['firstName', 'lastName', 'email', 'password', 'legacy'] });
                user = await User.scope('jwt').findByPk(legacyUser.id).then(u => u.toJSON());
                newToken = jwt.sign(user, JWT_SECRET_KEY);
                res.json({
                    ...user,
                    token: newToken,
                })
                return;
            }
            const existingUser = await User.findOne({
                where: { username },
            });
            if (existingUser) throw { status: 409, message: 'Username already in use' };
            legacyUser.set({
                ...rest,
                username,
                legacy: false,
            });
            await legacyUser.save({ fields: ['username', 'firstName', 'lastName', 'email', 'password', 'legacy'] });
            user = await User.scope('jwt').findByPk(legacyUser.id).then(u => u.toJSON());
            newToken = jwt.sign(user, JWT_SECRET_KEY);
            res.json({
                ...user,
                token: newToken
            });
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            await req.user.destroy();
            res.json('Account deleted');
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },
};