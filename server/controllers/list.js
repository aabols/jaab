const List = require('../db/models/List');
const User = require('../db/models/User');

const getLists = async (req, res) => {
    try {
        const user = req.user;
        const lists = await user.getLists();
        res.json(lists);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

const addList = async (req, res) => {
    try {
        const user = req.user;
        const newList = await user.createList(req.body);
        newList.reload();
        res.status(201).json(newList);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

const shareList = async (req, res) => {
    try {
        const userWithLists = await User.findByPk(req.user.id, {
            include: {
                model: List,
                required: true,
                where: { id: req.body.listId }
            }
        });
        if (userWithLists == null) throw { status: 404, message: 'List not found' };

        const list = userWithLists.Lists[0];
        if (list == null) throw { status: 404, message: 'List not found' };

        const targetUser = await User.findByPk(req.body.userId);
        if (targetUser == null) throw { status: 404, message: 'User not found' };

        await list.addUser(targetUser);
        res.json({ message: `List ${list.title} successfully shared with ${targetUser.firstName}` });
    } catch(err) {
        !!err.status ? res.status(err.status) : res.status(500);
        res.json({ message: err.message });
    }
}

module.exports = {
    getLists,
    addList,
    shareList
};