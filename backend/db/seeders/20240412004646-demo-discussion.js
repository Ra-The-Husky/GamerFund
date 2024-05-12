const { Discussion } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Discussion.bulkCreate(
      [
        {
          userId: 1,
          projectId: 1,
          title: "Greetings All future Vestors!",
          post: "Hey yo and salutations. We are excited to have the ball rolling on this project, and all of your continued support. Thank you all so much!",
          likes: 456,
          dislikes: 22,
          flag: "Praise",
          devPost: true,
        },
        {
          userId: 2,
          projectId: 1,
          title: "So far so f-ing good",
          post: "Game is looking really f***king good so far. Keep it up",
          likes: 23,
          dislikes: 0,
          flag: "Praise",
          devPost: false,
        },
        {
          userId: 3,
          projectId: 1,
          title: "Mid ahh game",
          post: "This game looks pretty mid so far, not enough action for me",
          likes: 99,
          dislikes: 745,
          flag: "Criticism",
          devPost: false,
        },
        {
          userId: 1,
          projectId: 2,
          title: "Idek tbh",
          post: "Hmmm...plenty of action here. I feel as though there is, maybe, too much action? Idek, ignore me.",
          likes: 532,
          dislikes: 694,
          devPost: false,
        },
        {
          userId: 2,
          projectId: 2,
          title: "For the combo fanatics!",
          post: "We got COMBOS! Tested and working, we implemented a nice little combo system for you combo-fiends out there!",
          likes: 8997,
          dislikes: 22,
          flag: "Update",
          devPost: true,
        },
        {
          userId: 3,
          projectId: 2,
          title: "Action. Action everywhere!",
          post: "PLENTY OF ACTION so far. Will there be beta test for vestors in future?",
          likes: 5664,
          dislikes: 108,
          flag: "Question",
          devPost: false,
        },
        {
          userId: 1,
          projectId: 3,
          title: "Is this legal? Can we talk about this?",
          post: "Gonna be honest, I wasn't expecting our main cast of playable characters to be elementary school kids, are they in elementary or are schools setup differently in Russia? Just curious. Mainly because I'm not sure how you guys plan to market this game to MOST countries where minors are the main characters.",
          likes: 993,
          dislikes: 474,
          flag: "Question",
          devPost: false,
        },
        {
          userId: 2,
          projectId: 3,
          title: "Big Mama's true colors",
          post: "Whoa, that Mother character is way scarier looking up close. Nice job to the design team on her, spotted soooo many little details that put the whole monster together.",
          likes: 77747,
          dislikes: 8,
          flag: "Praise",
          devPost: false,
        },
        {
          userId: 3,
          projectId: 3,
          title: "Our vestors ROCK!",
          post: "Big thanks to all of our vestors this far into production. We really appreciate you all!",
          likes: 98754,
          dislikes: 0,
          flag: "Praise",
          devPost: true,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Discussion";
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
