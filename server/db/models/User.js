'use strict';
const { Model } = require('sequelize');
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
      User.belongsToMany(models.List, { through: 'UserLists' });
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