'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      List.belongsToMany(models.User, { through: models.UserList });
      List.hasMany(models.ListGroup, { onDelete: 'CASCADE' });
      List.addScope('mustHaveUser', (userId) => ({
        include: {
          model: models.User,
          where: { id: userId },
          required: true,
        },
      }));
      List.addScope('includeUsers', {
        include: models.User.unscoped()
      });
      List.addScope('includeGroupsAndItems', {
        include: {
          model: models.ListGroup,
          include: models.ListItem
        }
      });
    }
    clean = (cleanOptions = {}) => {
      const { include = [] } = cleanOptions;
      const inclusions = {
        role: () => ({ _role: this.Users[0].UserList.role }),
        groupsWithItems: () => ({ ListGroups: this.ListGroups }),
      };
      const base = {
        id: this.id,
        title: this.title,
      };
      return include.reduce((c, i) => ({ ...c, ...(inclusions[i] && inclusions[i]()) }), base);
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