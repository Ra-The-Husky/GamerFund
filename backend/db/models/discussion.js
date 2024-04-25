"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discussion extends Model {
    static associate(models) {
      Discussion.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Discussion.belongsTo(models.Project, {
        foreignKey: "projectId",
      });
    }
  }
  Discussion.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      post: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likes: DataTypes.INTEGER,
      dislikes: DataTypes.INTEGER,
      flag: {
        type: DataTypes.STRING,
        defaultValue: "Comment",
      },
      devPost: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Discussion",
    }
  );
  return Discussion;
};
