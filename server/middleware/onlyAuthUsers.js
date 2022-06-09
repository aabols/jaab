const User = require('../db/models/User');

module.exports = async (req, res, next) => {
    if (req.user === null) {
        return res.status(403).json({ message: 'Forbidden' });
    };

    next();
};