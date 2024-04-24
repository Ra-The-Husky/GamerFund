const express = require("express");
const { Project } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateProject = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name of project required"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Project information required")
    .isLength({ min: 20 })
    .withMessage("Project description needs to be atleast 20 characters long"),
  check("genre")
    .exists({ checkFalsy: true })
    .withMessage("Please pick a genre"),
  check("country").exists({ checkFalsy: true }).withMessage("Country required"),
  check("deadline")
    .exists({ checkFalsy: true })
    .withMessage("Project contribution deadline required"),
  handleValidationErrors,
];

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

//Get all user projects
router.get("/account/projects", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const projects = await Project.findAll({
    where: {
      ownerId: userId,
    },
  });

  let userProjects = [];
  projects.forEach((project) => {
    userProjects.push(project.toJSON());
  });
  return res.json({
    Projects: userProjects,
  });
});

// Get project info by id
router.get("/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await Project.findByPk(projectId);

  if (!project) {
    res.status(404);
    return res.json({
      message: "Project couldn't be found",
    });
  }
  return res.json(project);
});
module.exports = router;

// Adds new project
router.post("/new-project", requireAuth, validateProject, async (req, res) => {
  const userId = req.user.id;
  const { name, description, genre, country, deadline } = req.body;

  const newProject = Project.build({
    ownerId: userId,
    name: name,
    description: description,
    genre: genre,
    country: country,
    deadline: deadline,
  });

  await newProject.save();
  res.status(201);
  return res.json(newProject);
});

// Update a user's project
router.put("/:projectId", requireAuth, validateProject, async (req, res) => {
  const projectId = req.params.projectId

  const { ownerId, name, description, genre, country, deadline } = req.body;

  const updateProject = await Project.findOne({
    where: {id: projectId},
  })

  if (!updateProject) {
    res.status(404)
    return res.json({
      message: "Project doesn't exist"
    })
  }

  updateProject.set({
    ownerId: ownerId,
    name: name,
    description: description,
    genre: genre,
    country: country,
    deadline: deadline,
  })
  await updateProject.save()
  return res.json(updateProject)
})
