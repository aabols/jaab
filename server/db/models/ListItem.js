const { DataTypes } = require('sequelize');

const sequelize = require('..');
const ListGroup = require('./ListGroup');

const ListItem = sequelize.define('ListItem', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Item must have a name' },
            notEmpty: { msg: 'Item must have a name' }
        }
    },
    checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    defaultScope: {
        attributes: ['id', 'title', 'checked']
    }
});

ListGroup.hasMany(ListItem, { onDelete: 'CASCADE' });
ListItem.belongsTo(ListGroup);

module.exports = ListItem;