"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.User, {
        foreignKey: "ownerId",
      });
      Project.hasMany(models.Discussion, {
        foreignKey: "projectId"
      })
    }
  }
  Project.init(
    {
      ownerId: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      info: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: DataTypes.STRING,
      deadline: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
