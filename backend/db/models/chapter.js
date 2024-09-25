'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    static associate(models) {
      Chapter.belongsTo(models.Project, {
        foreignKey: "projectId",
      });
    }
  }
  Chapter.init({
    projectId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    info: DataTypes.STRING,
    media: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chapter',
  });
  return Chapter;
};
