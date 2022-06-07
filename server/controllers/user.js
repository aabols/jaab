const User = require('../../db/models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

const addUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        await newUser.reload();
        res.status(201).json(newUser);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getUsers,
    addUser
};