'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      List.belongsToMany(models.User, { through: 'UserLists' });
      List.hasMany(models.ListGroup, { onDelete: 'CASCADE' });
    }
  }
  List.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'List must have a name' },
        notEmpty: { msg: 'List must have a name' }
      },
    },
  }, {
    sequelize,
    modelName: 'List',
    defaultScope: {
      attributes: ['id', 'title'],
    },
  });
  return List;
};