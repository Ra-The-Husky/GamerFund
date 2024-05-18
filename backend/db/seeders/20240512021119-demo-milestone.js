"use strict";
const { Milestone } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Milestone.bulkCreate(

      [
        {
          projectId: 1,
          name: "The Journey Begins!",
          description: "Added our game to GamerFund and gained our first vestor",
          progress: 1,
          goal: 1,
          type: "Developer Milestone",
          achieved: true,
        },
        {
          projectId: 1,
          name: "Founding Vestors",
          description: "Gained 50 Vestors",
          progress: 50,
          goal: 50,
          type: "Vestor Milestone",
          achieved: true,
        },
        {
          projectId: 1,
          name: "Foundational Funding",
          description: "Earned $10000",
          progress: 10000,
          goal: 10000,
          type: "Financial Milestone",
          achieved: true,
        },
        {
          projectId: 1,
          name: "The Journey Begins!",
          description: "Added our game to GamerFund and gained our first vestor",
          progress: 1,
          goal: 1,
          type: "Developer Milestone",
          achieved: true,
        },
        {
          projectId: 1,
          name: "Founding Vestors",
          description: "Gained 50 Vestors",
          progress: 50,
          goal: 50,
          type: "Vestor Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "Foundational Funding",
          description: "Earned $10000",
          progress: 5890,
          goal: 10000,
          type: "Financial Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "The Journey Begins!",
          description: "Added our game to GamerFund and gained our first vestor",
          progress: 1,
          goal: 1,
          type: "Developer Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "Founding Vestors",
          description: "Gained 50 Vestors",
          progress: 50,
          goal: 50,
          type: "Vestor Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "Foundational Funding",
          description: "Earned $10000",
          progress: 5890,
          goal: 10000,
          type: "Financial Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "The Journey Begins!",
          description: "Added our game to GamerFund and gained our first vestor",
          progress: 1,
          goal: 1,
          type: "Developer Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "Founding Vestors",
          description: "Gained 50 Vestors",
          progress: 50,
          goal: 50,
          type: "Vestor Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "Foundational Funding",
          description: "Earned $10000",
          progress: 5890,
          goal: 10000,
          type: "Financial Milestone",
          achieved: false,
        },

      ],
      { validate: true }
    )
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Milestone";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        projectId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
