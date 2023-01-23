const List = require('../db/models/List');
const User = require('../db/models/User');
const ListGroup = require('../db/models/ListGroup');
const ListItem = require('../db/models/ListItem');

const getLists = async (req, res) => {
    try {
        const user = req.user;
        const lists = await user.getLists();
        res.json(lists);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

const getListGroups = async (req, res) => {
    try {
        const user = req.user;
        const list = await user.getLists({
            where: { id: req.params.listId }
        }).then(lists => lists[0]);
        if (!list) return res.status(404).json({ message: 'List not found' });
        const listGroups = await list.getListGroups();
        res.json(listGroups);
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
};

const getListItems = async (req, res) => {
    try {
        const user = req.user;
        const list = await user.getLists({
            where: { id: req.params.listId }
        }).then(lists => lists[0]);
        if (!list) return res.status(404).json({ message: 'List not found' });
        const listGroup = await list.getListGroups({
            where: { id: req.params.groupId }
        }).then(listGroups => listGroups[0]);
        if (!listGroup) return res.status(404).json({ message: 'Group not found'});
        const listItems = await listGroup.getListItems();
        res.json(listItems);
    } catch(err) {
        res.status(500).json({ message: err.message })
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

const addListGroup = async (req, res) => {
    try {
        const user = req.user;
        const list = await user.getLists({
            where: { id: req.params.listId }
        }).then(lists => lists[0]);
        if (!list) return res.status(404).json({ message: 'List not found' });
        const listGroup = await list.createListGroup(req.body);
        res.status(201).json(listGroup);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

const addListItem = async (req, res) => {
    try {
        const user = req.user;
        const list = await user.getLists({
            where: { id: req.params.listId }
        }).then(lists => lists[0]);
        if (!list) return res.status(404).json({ message: 'List not found' });
        const listGroup = await list.getListGroups({
            where: { id: req.params.groupId }
        }).then(listGroups => listGroups[0]);
        if (!listGroup) return res.status(404).json({ message: 'Group not found'});
        const listItem = await listGroup.createListItem(req.body);
        res.status(201).json(listItem);
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
    shareList,
    getListGroups,
    addListGroup,
    getListItems,
    addListItem 
};