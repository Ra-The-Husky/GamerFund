"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          firstName: "Demo",
          lastName: "Lition",
          username: "Demo-lition",
          email: "demo@user.io",
          hashedPassword: bcrypt.hashSync("password"),
          developer: true,
          companyName: "DemoDev Team",
        },
        {
          firstName: "User",
          lastName: "One",
          username: "FakeUser1",
          email: "user1@user.io",
          hashedPassword: bcrypt.hashSync("password2"),
          developer: true,
          companyName: "GameTeamTwo",
        },
        {
          firstName: "User",
          lastName: "Two",
          username: "FakeUser2",
          email: "user2@user.io",
          hashedPassword: bcrypt.hashSync("password3"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
