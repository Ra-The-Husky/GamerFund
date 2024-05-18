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
          description:
            "Stop the dastardly Dr. R. Wrighter from changing history in out nextgen tower-defense game Crisiis Nexus. ",
          genre: "Strategy",
          deadline: new Date("03-25-2025"),
          country: "United States of America",
          imgUrl: "https://i.imgur.com/voPU80u.jpg",
        },
        {
          ownerId: 2,
          name: "Edge of Chaos",
          description:
            "Low resources, famine, war, and too much death. The world of Nethis is on the brink of an apocalypse. But a determined, Roland Maximoff, is working to prevent this in our Action packed shooter, beat-em up, hack n' slash game that'll blow your mind!",
          genre: "Action RPG",
          deadline: new Date("05-15-2027"),
          release: new Date("06-01-2027"),
          country: "United States of America",
          imgUrl: "https://i.imgur.com/Jxn0xzY.png",
        },
        {
          ownerId: 3,
          name: "The Lost Ones",
          description:
            "Bestfriends Taylor, Joshua, Abrahim, Lexi, and Peter find themselves trapped within a twisted version of their elementary school fighting for survival. Darkness lurks in the halls of this version Milkonovich Elementary. Will they survive and make it out? Or succumb to the evil and become a permanent student like the others?",
          genre: "Horror",
          deadline: new Date("09-24-2026"),
          release: new Date("12-15-2026"),
          country: "Unite Kingdom",
          imgUrl: "https://i.imgur.com/pXeF0jN.png",
        },
        {
          ownerId: 4,
          name: "Piper the Decipherer",
          description:
            "Piper the Great Decipherer is in trouble! Think you can solve all these puzzles and help Piper escape her puzzling prison?",
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
