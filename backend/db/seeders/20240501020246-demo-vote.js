"use strict";

const { Vote } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Vote.bulkCreate(
      [
        {
          userId: 1,
          discussionId: 1,
          liked: false,
          disliked: false,
        },
        { userId: 2, discussionId: 1, liked: false, disliked: false },
        { userId: 3, discussionId: 1, liked: false, disliked: false },
      ],
      { validate: true }
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Vote";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.in]: [1] },
      },
      {}
    );
  },
};
