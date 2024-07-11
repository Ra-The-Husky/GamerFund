"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Milestone extends Model {
    static associate(models) {
      Milestone.belongsTo(models.Project, {
        foreignKey: "projectId",
      });
    }
  }
  Milestone.init(
    {
      projectId: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: { type: DataTypes.STRING, allowNull: false },
      progress: { type: DataTypes.INTEGER, defaultValue: 0 },
      goal: { type: DataTypes.INTEGER, allowNull: false },
      type: DataTypes.STRING,
      achieved: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Milestone",
    }
  );
  return Milestone;
};
