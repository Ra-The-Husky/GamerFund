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
          country: "United States of America",
          hashedPassword: bcrypt.hashSync("password"),
          developer: true,
          companyName: "DemoDev Team",
          avatar: "https://rl-gamerfund.s3.us-east-2.amazonaws.com/Sona+profile.jpg"
        },
        {
          firstName: "Randy",
          lastName: "Donovan",
          username: "FakeUser1",
          email: "user1@user.io",
          country: "United States of America",
          hashedPassword: bcrypt.hashSync("password2"),
          developer: true,
          companyName: "TwoTangled Entertainment",
          avatar: "https://rl-gamerfund.s3.us-east-2.amazonaws.com/Seraphine+profile.jpg"
        },
        {
          firstName: "Charleston",
          lastName: "Whether",
          username: "CharlestonCHEWWY",
          email: "user2@user.io",
          country: "United Kingdom",
          developer: true,
          companyName: "AwesomerDevelopments",
          avatar: "https://rl-gamerfund.s3.us-east-2.amazonaws.com/Lux+profile.jpg",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Himiko",
          lastName: "Watanabe",
          username: "Wasabineko-maTa",
          email: "user3@user.io",
          country: "Japan",
          developer: true,
          companyName: "Shiba Games",
          avatar: "https://rl-gamerfund.s3.us-east-2.amazonaws.com/_4df9fd70-b3d6-4449-9899-426379d1ce08.jpg",
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
