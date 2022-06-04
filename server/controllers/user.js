const User = require('../../db/models/user');

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
        console.log(newUser.toJSON());
        res.status(201).json(newUser);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getUsers,
    addUser
};