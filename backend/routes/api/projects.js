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

router.get('/account/projects', requireAuth, async (req, res) => {
  const userId = req.user.id

  const projects = await Project.findAll({
    where: {
      ownerId: userId
    }
  })

  let userProjects = []
  projects.forEach((project) => {
    userProjects.push(project.toJSON())
  })
  return res.json({
    Projects: userProjects
  })
})

router.get('/:projectId', async (req, res) => {
    const projectId = req.params.projectId
    const project = await Project.findByPk(projectId)

    if (!project){
        res.status(404);
        return res.json({
          message: "Project couldn't be found",
        });
    }
    return res.json(project)
})
module.exports = router
