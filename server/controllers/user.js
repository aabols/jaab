const User = require('../db/models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

const addUser = async (req, res) => {
    const {email, ...rest} = req.body;
    try {
        const [user, created] = await User.findOrCreate({
            where: { email: email },
            defaults: rest
        });
        await user.reload();
        if (!created) {
            res.status(400).json({ message: 'E-mail already in use'});
        } else {
            res.status(201).json(user);
        }
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getUsers,
    addUser
};