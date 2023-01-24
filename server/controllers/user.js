const User = require('../db/models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch({ status, message }) {
        res.status(status || 500).json({ message });
    }
};

const addUser = async (req, res) => {
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
};

const deleteUser = async (req, res) => {
    try {
        await req.user.destroy();
        res.json('Account deleted');
    } catch({ status, message }) {
        res.status(status || 500).json({ message });
    }
};

module.exports = {
    getUsers,
    addUser,
    deleteUser
};