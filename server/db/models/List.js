const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../');
const User = require('./User');

const List = sequelize.define(
    'List',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {}
);

const listUserAssociationTable = 'UserLists';

User.belongsToMany(List, { through: listUserAssociationTable });
List.belongsToMany(User, { through: listUserAssociationTable });

module.exports = List;