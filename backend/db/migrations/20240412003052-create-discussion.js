"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Discussions",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        projectId: {
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING
        },
        post: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        likes: {
          type: Sequelize.INTEGER,
          default: 0
        },
        dislikes: {
          type: Sequelize.INTEGER,
          default: 0
        },
        flag: {
          type: Sequelize.STRING,
          default: "Comment",
        },
        devPost: {
          type: Sequelize.BOOLEAN,
          default: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Discussions";
    return queryInterface.dropTable(options);
  },
};
