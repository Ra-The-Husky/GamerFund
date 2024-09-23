# Gamerfund

Welcome to GamerFunds - A perpetual crowdfunding service for game developers to gain continuous support for games in the making from like-minded and passionate vestors(users).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Technology Used](#technology-used)
- [The Creator](#the-creator)

## Introduction

With a similar contributor model to that of Pateron, GamerFund allows new and smaller developers to post their games and recieve funding from authorized users based on selected payment tiers setup by the developers. On the developer side of things, they'll be able to customize what information they attach to their games in order to entice potential vestors to make regular contributions to the development of the game. This can include but is not limited to: An interesting tag line for the projects list, any worthwhile information about the game, what is being worked on currently and the plans for what will be worked on in the future, incentives for vestors that contribute, milestones to show development progress and achievements, and any media they'd think would help promote their project even more.

Vestors are users that contribute to projects they wish to be involved with. They'll be able to choose how they wish to "vest" into a project by selecting from options presented by the developer of the game they want to vest in. This could inlcude a subscription style contribution or a single one-time contribution. Both kinds of users will be able to post topics onto projects and have conversations via discussion boards throughout the lifetime of the games they find on GamerFund. While their is a lot of developer power, the vestors hold the real power in helping to bring game's to life. For projects to receive funding, developers must make regular substantial updates to their vestors while also cultivating and maintaining support for their game as best as they can. Does your game need funding? Or maybe you'd like to be responsible to bringing great new games to the market? Either way, GamerFund is the place to get it done. I encourage you to take a look at the live version of GamerFund here! [Gamerfund](https://gamer-fund.onrender.com)


## Features

- Create and Manage projects
- Create and Manage Discussions
- Create and Manage Milestones
- Home for budding new game projects
- Direct developer-to-vestor interactions
- User-friendly and industry modern UI
## Setup and installation

To get GamerFund running, please follow these steps:

1. Clone this repository from GitHub.
2. Navigate to the project directory.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. In the backend folder migrate database:

   ```bash
   npx dotenv sequelize db:migrate
   ```

5. Seed the database:

   ```bash
   npx dotenv sequelize db:seed:all
   ```

6. Start the server (still in Backend folder):

   ```bash
   npm start
   ```

7. Run React app in the Frontend Folder:

   ```bash
   npm run dev
   ```
## Technology Used

- JavaScript
- Express
- React.js
- SQLite
- Redux.js
- AWS

## The Creator
[Rasheed Lindsey](https://github.com/Ra-The-Husky)
