'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ListGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListGroup.belongsTo(models.List);
      ListGroup.hasMany(models.ListItem, { onDelete: 'CASCADE' });
      ListGroup.addScope('includeItems', {
        include: models.ListItem,
      });
      ListGroup.addScope('mustHaveUser', (userId) => ({
        include: {
          model: models.List,
          required: true,
          include: {
            model: models.User,
            where: { id: userId },
            required: true,
          },
        },
      }));
    }
    clean = (cleanOptions = {}) => {
      const { include = [] } = cleanOptions;
      const inclusions = {
        items: () => ({ ListItems: this.ListItems }),
      };
      const base = {
        id: this.id,
        title: this.title,
      };
      return include.reduce((c, i) => ({ ...c, ...(inclusions[i] && inclusions[i]()) }), base);
    }
  }
  ListGroup.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Group must have a name' },
        notEmpty: { msg: 'Group must have a name' },
      },
    },
  }, {
    sequelize,
    modelName: 'ListGroup',
    defaultScope: {
      attributes: ['id', 'title'],
    },
  });
  return ListGroup;
};