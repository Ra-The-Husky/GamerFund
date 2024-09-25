"use strict";

const { Chapter } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Chapter.bulkCreate([
      {
        projectId: 1,
        title: "Story",
        info: `A tower-defense game like no other! Travel through different points in world history, warped by Dr. R. Wright's henchmen, and defend the timeline from the abnormalities.
              Dynamic stages, exiciting battles, a plethora of defenses to choose from, and an engaging story, can you foil the evil Dr. Wright's plans to bend the future to his will?`,
        media: "",
      },
      {
        projectId: 1,
        title: "Main Features",
        info: `Time is getting all screwed up! Use the time nexus, W.A.T.C.H, to travel to a point in time that is experiencing an abnormality and defend it!
        Visit different eras one than once to learn about its impact on the world while also uncovering the truth behind Dr. R. Wright's evil schemes.
        Assemble a team of defenders to defend more critical points together!
        The more you learn the more you grow. Increase the efficiency of your defenses with upgrades and learn new skills too!
        Here in the Nexus we exist outside of time. So relax in your quarters and rest yourself.
        While you're here, why not customize your quarters to your liking with over a hundred different decorations and furniture?
        Compete with other defenders to win big rewards and credits by taking on challenges.`,
        media: "",
      },
      {
        projectId: 1,
        title: "Main Plot & Important Figure Heads",
        info: `The crazy mastermind Dr. R. Wright is traveling throughout earth's history in an attempt to change the future.
        While his cause sounded noble in the beginning, his true intentions were shortly revealed. Planning to rewrite history to benefit him in the future,
        the defenders at Nexus must stop him at all costs!`,
        media: "",
      },
      {
        projectId: 1,
        title: "Gameplay",
        info: "",
        media: "",
      },
      {
        projectId: 1,
        title: "World & Setting",
        info: "",
        media: "",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Chapters";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      projectId: {
        [Op.in]: [1],
      },
    });
  },
};
