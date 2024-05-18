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
          name: "Defenses operatonal!",
          description: "Fully completed and tested basic defense systems",
          progress: 1,
          goal: 1,
          type: "Developer Milestone",
          achieved: true,
        },
        {
          projectId: 1,
          name: "More Defenders of History",
          description: "Gained 1000 Vestors",
          progress: 657,
          goal: 1000,
          type: "Vestor Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "Operational Funding",
          description: "Earned $50000",
          progress: 32560,
          goal: 50000,
          type: "Financial Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "Meet the Cast!",
          description: "Completed character concepts for all ",
          progress: 0,
          goal: 1,
          type: "Developer Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "Even More Defenders of History",
          description: "Gained 1500 Vestors",
          progress: 657,
          goal: 1500,
          type: "Vestor Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "Full Steam Funding",
          description: "Earned $100000",
          progress: 32560,
          goal: 100000,
          type: "Financial Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "The Stage is Set",
          description: "Fully created, tested, and added all base game levels for the game",
          progress: 0,
          goal: 1,
          type: "Developer Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "Look Ma! We're Famous!",
          description: "Gained 1 million followers across all social media",
          progress: 999999,
          goal: 1000000,
          type: "Vestor Milestone",
          achieved: false,
        },
        {
          projectId: 1,
          name: "Maintenance Funding",
          description: "Earned $500000",
          progress: 32560,
          goal: 500000,
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
