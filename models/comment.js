'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  comment.init({
    id_content: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  comment.associate = function(models) {
    comment.belongsTo(models.user, {foreignKey: 'createdBy', as: 'user'})
    comment.belongsTo(models.content, {foreignKey: 'id_content', as: 'content'})
    comment.hasOne(models.like, {foreignKey: 'id_comment', as: 'like'})
    comment.hasOne(models.reply, {foreignKey: 'id_comment', as: 'reply'})
  };
  return comment;
};