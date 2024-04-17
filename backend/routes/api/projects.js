const express = require("express");
const { Project } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// const validateProject = [
//     check()
//     .exists()
//     .withMessage()
// ]

// Get all Projects
router.get("/", async (req, res, next) => {
  let allProjects;

    allProjects = await Project.findAll();
    let projectsList = [];
    allProjects.forEach((project) => {
      projectsList.push(project.toJSON());
    });
    
    return res.json({
      Projects: projectsList,
    });

});

module.exports = router
