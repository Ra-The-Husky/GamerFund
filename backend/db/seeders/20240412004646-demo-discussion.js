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
        //DevPosts
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
          projectId: 3,
          title: "Our vestors ROCK!",
          post: "Big thanks to all of our vestors this far into production. We really appreciate you all!",
          likes: 98754,
          dislikes: 0,
          flag: "Praise",
          devPost: true,
        },
        //!Vestor Discussons
        //Crisiis Nexus
        {
          userId: 2,
          projectId: 1,
          title: "Love the Concept",
          post: "I can't wait for Crisiis Nexus to drop! The concept of traveling across different time periods and universes to stop a villain from altering history sounds epic. Each era's unique challenges and defenses will definitely keep the gameplay fresh and exciting!",
          likes: 5556,
          dislikes: 0,
          flag: "Praise",
          devPost: false,
        },
        {
          userId: 3,
          projectId: 1,
          title: "There's a lot of depth here",
          post: "The developers of Crisiis Nexus have really outdone themselves. The idea of a tower defense game that spans multiple time periods, from ancient civilizations to futuristic worlds, is something I've always wanted to see. The strategic depth this could bring is incredible!",
          likes: 897,
          dislikes: 10,
          flag: "Praise",
          devPost: false,
        },
        {
          userId: 2,
          projectId: 1,
          title: "Mid ahh graphics",
          post: "I'm excited about Crisiis Nexus, but the graphics shown in the previews look a bit dated. For a game that's supposed to span various exciting and visually diverse timelines, the art style feels like it could use more polish and detail to really bring those settings to life.",
          likes: 151,
          dislikes: 56,
          flag: "Criticism",
          devPost: false,
        },
        {
          userId: 4,
          projectId: 1,
          title: "I seriously can't wait!",
          post: "Ever since I saw the first trailer for Crisiis Nexus, I've been counting down the days until release. The idea of defending different eras of history from a time-traveling villain is such a cool twist. I can't wait to see how each period's unique towers and enemies will play out!",
          likes: 99,
          dislikes: 745,
          flag: "Praise",
          devPost: false,
        },
        {
          userId: 2,
          projectId: 1,
          title: "Narrative Question",
          post: "What kind of narrative depth can we expect from Crisiis Nexus? Will there be a compelling story that ties all the different timelines together, or will it primarily focus on gameplay?",
          likes: 958,
          dislikes: 123,
          flag: "Question",
          devPost: false,
        },
        {
          userId: 3,
          projectId: 1,
          title: "This is certainly an ambitous game",
          post: "Honestly, Crisiis Nexus sounds like it's trying to do too much. The idea of mixing tower defense with time travel and different historical periods is ambitious, but I'm worried it might end up being a chaotic mess rather than a cohesive game. The devs need to make sure they're not biting off more than they can chew.",
          likes: 3025,
          dislikes: 745,
          flag: "Criticism",
          devPost: false,
        },
        {
          userId: 3,
          projectId: 1,
          title: "So far so f-ing good",
          post: "With such an ambitious concept, how is the development team addressing potential bugs and technical issues that might arise from having so many different settings and mechanics in Crisiis Nexus?",
          likes: 23,
          dislikes: 0,
          flag: "Question",
          devPost: false,
        },
        {
          userId: 4,
          projectId: 1,
          title: "Player Progression and game difficulty",
          post: "How are the devs planning to balance the difficulty across different eras and universes? Like, will there be a kind of progression system that adapts to keep it challenging or...?",
          likes: 99,
          dislikes: 745,
          flag: "Criticism",
          devPost: false,
        },

        {
          userId: 4,
          projectId: 1,
          title: "Keeping things unique without repition",
          post: "While the concept of Crisiis Nexus is intriguing, I'm concerned about how well the developers can balance the gameplay across different time periods. It seems like a daunting task to ensure each era feels unique without becoming repetitive or overly complicated.",
          likes: 99,
          dislikes: 745,
          flag: "Criticism",
          devPost: false,
        },

        //Edge of Chaos
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
          userId: 3,
          projectId: 2,
          title: "Action. Action everywhere!",
          post: "PLENTY OF ACTION so far. Will there be beta test for vestors in future?",
          likes: 5664,
          dislikes: 108,
          flag: "Question",
          devPost: false,
        },
        //The Lost Ones
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
        //Piper the Decipherer
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
        projectId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
