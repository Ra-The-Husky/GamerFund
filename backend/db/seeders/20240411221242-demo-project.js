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
          info: "A tower defense game unlike anything you've ever seen",
          genre: "Strategy",
          country: "United States of America",
          deadline: "4/30/2029"
        },
        {
          ownerId: 2,
          name: "Edge of Chaos",
          info: "Action packed shooter, beat-em up, hack n' slash game that'll rock your socks off!",
          genre: "Action RPG",
          country: "United States of America",
          deadline: "5/15/2027"
        },
        {
          ownerId: 3,
          name: "Lost Ones",
          info: "Narrative focused survival horror game that let's you play with one of five characters as you unravel the secrets of the their school's forbidden wing.",
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
