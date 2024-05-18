"use strict";

const { ImGrin } = require("react-icons/im");
const { Project } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Project.bulkCreate(
      [
        {
          ownerId: 1,
          name: "Crisiis Nexus",
          caption:
            "Stop the dastardly Dr. R. Wright from changing history in out nextgen tower-defense game Crisiis Nexus.",
          description:
            "History as we know it is in danger! Travel throughout time and space to stop Dr. R. Wright and his evil henchmen, 'the wrighters', from altering history.",
          genre: "Strategy",
          deadline: new Date("03-25-2025"),
          release: new Date("04-25-2025"),
          country: "United States of America",
          imgUrl: "https://i.imgur.com/voPU80u.jpg",
        },
        {
          ownerId: 2,
          name: "Edge of Chaos",
          caption: "The world of Aethis is on the brink of an apocalypse. Can the world be saved in this action packed RPG that'll blow your mind!?",
          description:
            "Roland Maximoff, defies fate in an attempt to save his world from an apocalyptic end.",
          genre: "Action RPG",
          deadline: new Date("05-15-2027"),
          release: new Date("06-01-2027"),
          country: "United States of America",
          imgUrl: "https://i.imgur.com/Jxn0xzY.png",
        },
        {
          ownerId: 3,
          name: "The Lost Ones",
          caption: "Darkness lurks in the halls of Eve's Garden Elementary.",
          description:
            "Bestfriends Taylor, Joshua, Abrahim, Lexi, and Peter find themselves trapped within a twisted version of their elementary school fighting for survival. Will they survive and make it out or succumb to the evil and madness within and become a permanent student like the others?",
          genre: "Horror",
          deadline: new Date("09-24-2026"),
          release: new Date("12-15-2026"),
          country: "United Kingdom",
          imgUrl: "https://i.imgur.com/pXeF0jN.png",
        },
        {
          ownerId: 4,
          name: "Piper the Decipherer",
          caption: "The Greatest Puzzle Solver has been captured and needs your help!",
          description:
            "Piper the Great Decipherer is in trouble! Her greatest rival, Diana the Puzzler, has trapped her within a complex series of puzzles. Think you can solve all her mind-boggling challenges and help Piper escape her puzzling prison?",
          genre: "Puzzle",
          deadline: new Date("10-15-2028"),
          release: new Date("11-15-2028"),
          country: "Japan",
          imgUrl: "https://i.imgur.com/kedReTu.jpg",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Projects";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Crisiis Nexus",
            "Edge of Chaos",
            "The Lost Ones",
            "Piper the Decipherer",
          ],
        },
      },
      {}
    );
  },
};
