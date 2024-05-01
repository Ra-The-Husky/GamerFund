"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.User, {
        foreignKey: "ownerId",
      });
      Project.hasMany(models.Discussion, {
        foreignKey: "id"
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: DataTypes.STRING,
      deadline: {
        type: DataTypes.DATE,
        validate: {
          isDate: true
        }

      }
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
