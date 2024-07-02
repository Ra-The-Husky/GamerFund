"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discussion extends Model {
    static associate(models) {
      Discussion.belongsToMany(models.User, {
        through: models.Vote,
        foreignKey: "discussionId",
        otherKey: "userId",
      });
      Discussion.belongsTo(models.Project, {
        foreignKey: "projectId",
      });
      // Discussion.hasMany(models.Vote, {
      //   foreignKey: "discussionId",
      // });
    }
  }
  Discussion.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      post: {
        type: DataTypes.Text,
        allowNull: false,
      },
      likes: { type: DataTypes.INTEGER, defaultValue: 0 },
      dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
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
