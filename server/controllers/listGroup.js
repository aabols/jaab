const { ListGroup } = require('../db/models');

module.exports = {
    getListGroup: async (req, res) => {
        try {
            const listGroup = await ListGroup
                .scope(
                    { method: ['mustHaveUser', req.user.id] },
                    'includeItems',
                )
                .findByPk(req.params.groupId);
            if (!listGroup) throw { status: 404, message: 'Group not found' };
            res.json(listGroup.clean({ include: ['items'] }));
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    updateListGroup: async (req, res) => {
        try {
            const listGroup = await ListGroup
                .scope(
                    { method: ['mustHaveUser', req.user.id] },
                )
                .findByPk(req.params.groupId);
            if (!listGroup) throw { status: 404, message: 'Group not found' };
            if (listGroup.List.Users[0].UserList.role > 2) throw { status: 403, message: 'Insufficient role' };
            listGroup.set(req.body);
            await listGroup.save({ fields: ['title'] });
            res.json(listGroup.clean());
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        };
    },

    deleteListGroup: async (req, res) => {
        try {
            const group = await ListGroup
                .scope(
                    { method: ['mustHaveUser', req.user.id] },
                )
                .findByPk(req.params.groupId);
            if (!group) throw { status: 404, message: 'Group not found' };
            if (group.List.Users[0].UserList.role > 2) throw { status: 403, message: 'Insufficient role' };
            group.destroy();
            res.json({ message: 'Group deleted' });
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        };
    },

    addListItem: async (req, res) => {
        try {
            const listGroup = await ListGroup
                .scope(
                    { method: ['mustHaveUser', req.user.id] },
                )
                .findByPk(req.params.groupId);
            if (!listGroup) throw { status: 404, message: 'Group not found' };
            if (listGroup.List.Users[0].UserList.role > 3) throw { status: 403, message: 'Insufficient role' };
            const listItem = await listGroup.createListItem(req.body);
            res.status(201).json(listItem.clean());
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        };
    },
};
