'use strict';

const { Project } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

  module.exports = {
    async up (queryInterface, Sequelize) {
      await Project.bulkCreate([
        {
          ownerId: 1,
          name: "Crisis Nexus",
          description: "The NextGen of Tower-Defense Games",
          genre: "Strategy",
          country: "United States of America",
          deadline: "4/30/2029"
        },
        {
          ownerId: 2,
          name: "Edge of Chaos",
          description: "Action packed shooter, beat-em up, hack n' slash game that'll rock your socks off!",
          genre: "Action RPG",
          country: "United States of America",
          deadline: "5/15/2027"
        },
        {
          ownerId: 3,
          name: "The Lost Ones",
          description: "Darkness lurks in the halls of Milkonovich Elementary.",
          genre: "Horror",
          country: "Russia",
          deadline: "09/24/2030"
        },
      ], { validate: true });
    },

    async down (queryInterface, Sequelize) {
      options.tableName = 'Users';
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        name: { [Op.in]: ['Crisis Nexus', 'Edge of Chaos', 'Lost Ones'] }
      }, {});
    }
  };
