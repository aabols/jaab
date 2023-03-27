'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ListItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListItem.belongsTo(models.ListGroup);
      ListItem.addScope('mustHaveUser', (userId) => ({
        include: {
          model: models.ListGroup,
          required: true,
          include: {
            model: models.List,
            required: true,
            include: {
              model: models.User,
              where: { id: userId },
              required: true,
            },
          },
        }
      }));
    }
    clean = (cleanOptions = {}) => {
      const { include = [] } = cleanOptions;
      const inclusions = {
        // name: () => ({ attribute: value }),
      };
      const base = {
        id: this.id,
        title: this.title,
        checked: this.checked,
      };
      return include.reduce((c, i) => ({ ...c, ...(inclusions[i] && inclusions[i]()) }), base);
    }
  }
  ListItem.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Item must have a name' },
        notEmpty: { msg: 'Item must have a name' },
      },
    },
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'ListItem',
    defaultScope: {
      attributes: ['id', 'title', 'checked'],
    },
  });
  return ListItem;
};