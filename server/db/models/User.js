'use strict';
const { Model, Op } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.List, { through: models.UserList });
      User.addScope('mayHaveList', (listId) => ({
        include: {
          model: models.List,
          where: { id: listId },
          required: false,
        },
      }));
      User.addScope('search', (query, limit) => ({
        limit,
        where: {
          [Op.or]: [
            { username: { [Op.substring]: query } },
            { firstName: { [Op.substring]: query } },
            { lastName: { [Op.substring]: query } },
          ],
        },
      }));
      User.addScope('excludeId', (excludeId) => ({
        where: { id: { [Op.ne]: excludeId } },
      }));
      User.addScope('mustHaveList', (listId) => ({
        include: {
          model: models.List,
          where: { id: listId },
          required: true,
        },
      }));
    }
    clean = (cleanOptions = {}) => {
      const { include = [] } = cleanOptions;
      const inclusions = {
        // inclusionName: () => ({attributeName: attributeValue}),
        listRole: () => ({ _role: this.Lists[0].UserList.role }),
      };
      const base = {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
      };
      return include.reduce((c, i) => ({ ...c, ...(inclusions[i] && inclusions[i]()) }), base);
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Username required' },
        notEmpty: { msg: 'Username required' },
        isAlphanumeric: { msg: 'Only letters and numbers in username' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'E-mail address required' },
        notEmpty: { msg: 'E-mail address required' },
        isEmail: { msg: 'Invalid e-mail address' },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'First name required' },
        notEmpty: { msg: 'First name required' },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Last name required' },
        notEmpty: { msg: 'Last name required' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password) {
        if (!password) {
          throw new Error('Password required');
        }
        if (password.length < 8) {
          throw new Error('Password should be at least 8 characters');
        }
        this.setDataValue(
          'password',
          bcrypt.hashSync(password, 10)
        );
      },
    },
    legacy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: ['username', 'firstName', 'lastName'],
    },
    scopes: {
      auth: {
        attributes: {},
      },
      id: {
        attributes: ['id', 'username', 'firstName', 'lastName'],
      },
      jwt: {
        attributes: ['username', 'firstName', 'lastName'],
      },
    },
  });
  return User;
};
