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
          post: "Hey yo and salutations. We are excited to have the ball rolling on this project, and all of your continued support. Thank you all so much!",
          likes: 456,
          dislikes: 22,
          devPost: true,
        },
        {
          userId: 2,
          projectId: 1,
          post: "So far this game is lookin pretty dope, keep it up!",
          likes: 23,
          dislikes: 0,
          devPost: false,
        },
        {
          userId: 3,
          projectId: 1,
          post: "This game looks pretty mid so far, not enough action for me",
          likes: 99,
          dislikes: 745,
          devPost: false,
        },
        {
          userId: 1,
          projectId: 2,
          post: "Hmmm...plenty of action here. I feel as though there is, maybe, too much action? Idek, ignore me.",
          likes: 532,
          dislikes: 694,
          devPost: false,
        },
        {
          userId: 2,
          projectId: 2,
          post: "We got COMBOS! Tested and working, we implemented a nice little combo system for you combo-fiends out there!",
          likes: 8997,
          dislikes: 22,
          devPost: true,
        },
        {
          userId: 3,
          projectId: 2,
          post: "PLENTY OF ACTION so far. Will there be beta test for vestors in future?",
          likes: 5664,
          dislikes: 108,
          devPost: false,
        },
        {
          userId: 1,
          projectId: 3,
          post: "Gonna be honest, I wasn't expecting our main cast of playable characters to be elementary school kids, are they in elementary or are schools setup differently in Russia? Just curious.",
          likes: 993,
          dislikes: 474,
          devPost: false,
        },
        {
          userId: 2,
          projectId: 3,
          post: "Whoa, that Mother character is way scarier looking up close. Nice job to the design team on her, spotted soooo many little details that put the whole monster together.",
          likes: 77747,
          dislikes: 8,
          devPost: false,
        },
        {
          userId: 3,
          projectId: 3,
          post: "Big thanks to all of our vestors this far into production. We really appreciate you all!",
          // post: "Thanks to all vestors for the last couple months we've managed to speed up production. We had extra time, so our team got a bunch of mocap actors and animals together, and our team of animators go to work. You'll be able to play with the character's guardian spirit when you feel stressed out in-game. You can hold your applause for game release. Your welcome.",
          likes: 98754,
          dislikes: 0,
          devPost: true,
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
        projectId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
