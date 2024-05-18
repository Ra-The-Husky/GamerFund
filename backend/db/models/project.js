"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.User, {
        foreignKey: "ownerId",
      });
      Project.hasMany(models.Discussion, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      Project.hasMany(models.Milestone, {
        foreignKey: "projectId",
        onDelete: "CASCADE",
      });
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
      country: {
        type: DataTypes.STRING,
      },
      release: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      deadline: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
