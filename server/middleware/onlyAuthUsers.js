module.exports = async (req, res, next) => {
    if (req.user === null) {
        return res.status(401).json({ message: 'Unauthorized' });
    };

    next();
};