const { List, User, Sequelize: { Op } } = require('../db/models');

module.exports = {
    getList: async (req, res) => {
        try {
            const list = await List
                .scope(
                    { method: ['mustHaveUser', req.user.id] },
                    'includeGroupsAndItems'
                )
                .findByPk(req.params.listId);
            if (!list) throw { status: 404, message: 'List not found' };
            res.json(list.clean({ include: ['role', 'groupsWithItems'] }));
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    updateList: async (req, res) => {
        try {
            const list = await List
                .scope({ method: ['mustHaveUser', req.user.id] })
                .findByPk(req.params.listId);
            if (!list) throw { status: 404, message: 'List not found' };
            const role = list.Users[0].UserList.role;
            if (role > 1) throw { status: 403, message: 'Insufficient role' };
            list.set(req.body);
            await list.save({ fields: ['title'] });
            res.json(list.clean({ include: ['role'] }));
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        }
    },

    deleteList: async (req, res) => {
        try {
            const list = await List
                .scope({ method: ['mustHaveUser', req.user.id] })
                .findByPk(req.params.listId);
            if (!list) throw { status: 404, message: 'List not found' };
            if (list.Users[0].UserList.role > 1) throw { status: 403, message: 'Insufficient role' };
            await list.destroy();
            res.json({ message: 'List deleted' });
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        }
    },

    addListGroup: async (req, res) => {
        try {
            const list = await List
                .scope({ method: ['mustHaveUser', req.user.id] })
                .findByPk(req.params.listId);
            if (!list) throw { status: 404, message: 'List not found' };
            if (list.Users[0].UserList.role > 2) throw { status: 403, message: 'Insufficient role' };
            const listGroup = await list.createListGroup(req.body);
            res.status(201).json(listGroup.clean());
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        }
    },

    shareList: async (req, res) => {
        try {
            if (!req.body.role || !req.body.username) throw { status: 400, message: 'Role and/or username not specified' };
            if (req.body.username === req.user.username) throw { status: 400, message: 'Cannot change own permissions' };
            const list = await List
                .scope({ method: ['mustHaveUser', req.user.id] })
                .findByPk(req.params.listId);
            if (!list) throw { status: 404, message: 'List not found' };
            const role = list.Users[0].UserList.role;
            if (role > req.body.role) throw { status: 403, message: 'Insufficient role' };
            const user = await User.scope({ method: ['mayHaveList', req.params.listId] }).findOne({
                where: { username: req.body.username },
            });
            if (!user) throw { status: 404, message: 'User not found' };
            const userRole = user.Lists[0]?.UserList.role;
            if (userRole && role > userRole) throw { status: 403, message: 'Insufficient role' };
            await list.addUser(user, { through: { role: req.body.role } });
            res.json({
                ...user.clean(),
                _role: req.body.role
            });
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    unshareList: async (req, res) => {
        try {
            if (!req.body.username) throw { status: 400, message: 'Username not specified' };
            const list = await List
                .scope('includeUsers')
                .findByPk(req.params.listId);
            const requestingUser = list.Users.find(u => u.id === req.user.id);
            if (!list || !requestingUser) throw { status: 404, message: 'List not found' };
            const targetUser = list.Users.find(usr => usr.username === req.body.username);
            if (!targetUser) throw { status: 404, message: 'User not found' };
            const requestingRole = requestingUser.UserList.role;
            const targetRole = targetUser.UserList.role;
            if (requestingRole > targetRole) throw { status: 403, message: 'Insufficient role' };
            if (list.Users.length < 2) throw { status: 405, message: 'List must have an owner' };
            await list.removeUser(targetUser);
            res.json({
                ...targetUser.clean(),
                _role: null,
            });
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    getUsers: async (req, res) => {
        try {
            const listUsers = await User
                .scope({ method: ['mustHaveList', req.params.listId] })
                .findAll();
            const requestingUser = listUsers.find(u => u.id === req.user.id);
            if (!requestingUser) throw { status: 404, message: 'List not found' };
            res.json(listUsers.map(u => u.clean({ include: ['listRole'] })));
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },
};
