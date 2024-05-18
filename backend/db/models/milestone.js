"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Milestone extends Model {
    static associate(models) {
     Milestone.belongsTo(models.Project, {
      foreignKey: "ProjectId"
     })
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
      progress: DataTypes.INTEGER,
      goal: { type: DataTypes.INTEGER, allowNull: false },
      type: DataTypes.STRING,
      achieved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Milestone",
    }
  );
  return Milestone;
};
