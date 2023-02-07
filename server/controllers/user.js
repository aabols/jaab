const User = require('../db/models/User');
const { Op } = require('sequelize');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const q = req.query;
            const users = await User.findAll({
                where: {
                    [Op.or]: [
                        {email: {[Op.substring]: q.searchString}},
                        {firstName: {[Op.substring]: q.searchString}},
                        {lastName: {[Op.substring]: q.searchString}},
                    ]
                }
            });
            if (users.length > 10) throw { status: 400, message: 'Too many results returned' };
            res.json(users);
        } catch({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    addUser: async (req, res) => {
        const { email, ...rest } = req.body;
        try {
            const [user, created] = await User.findOrCreate({
                where: { email },
                defaults: rest
            });
            if (!created) throw { status: 409, message: 'E-mail already in use' };
            await user.reload();
            res.status(201).json(user);
        } catch({ status, message}) {
            res.status(status || 400).json({ message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            await req.user.destroy();
            res.json('Account deleted');
        } catch({ status, message }) {
            res.status(status || 500).json({ message });
        }
    }
};