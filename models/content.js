'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  content.init({
    id_category: DataTypes.INTEGER,
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    slug: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    view: DataTypes.INTEGER,
    last_view: DataTypes.DATE,
    share: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'content',
  });
  content.associate = function(models) {
    content.belongsTo(models.category, {foreignKey: 'id_category', as: 'category'}),
    content.belongsTo(models.user, {foreignKey: 'createdBy', as: 'user'})
  };
  return content;
};