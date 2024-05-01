"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    static associate(models) {
      Vote.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Vote.belongsTo(models.Discussion, {
        foreignKey: "discussionId",
      });
    }
  }
  Vote.init(
    {
      userId: DataTypes.INTEGER,
      discussionId: DataTypes.INTEGER,
      liked: { type: DataTypes.BOOLEAN, defaultValue: false },
      disliked: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  return Vote;
};
