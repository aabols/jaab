const { DataTypes } = require('sequelize');

const sequelize = require('../');
const User = require('./User');

const List = sequelize.define(
    'List',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'List must have a name'},
                notEmpty: { msg: 'List must have a name'}
            }
        }
    }, {}
);

const listUserAssociationTable = 'UserLists';

User.belongsToMany(List, { through: listUserAssociationTable });
List.belongsToMany(User, { through: listUserAssociationTable });

module.exports = List;