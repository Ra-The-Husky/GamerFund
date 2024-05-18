"use strict";

const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Project, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
        hooks: true,
      });
      User.belongsToMany(models.Discussion, {
        through: models.Vote,
        foreignKey: "userId",
        // otherKey: "discussionId",
        onDelete: "CASCADE",
        hooks: true,
      });
      // User.hasMany(models.Vote, {
      //   foreignKey: "userId",
      //   onDelete: "CASCADE",
      //   hooks: true,
      // });
    }
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      developer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      companyName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
    }
  );
  return User;
};
