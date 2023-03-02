const { Op } = require('sequelize');
const db = require('../db/models');
// const User = require('../db/models/User');
const User = db.User;

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

    deleteUser: async (req, res) => {
        try {
            await req.user.destroy();
            res.json('Account deleted');
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },
};