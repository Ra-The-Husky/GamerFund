"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Projects",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ownerId: {
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        genre: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        info: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        country: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        deadline: {
          type: Sequelize.DATE(),
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
    options.tableName = "Projects";
    return queryInterface.dropTable(options);
  },
};