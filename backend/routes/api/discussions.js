const express = require("express");
const { Project, Discussion } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");


// const validateDiscussion = [
//   check().exists().withMessage()
// ]




  module.exports = router
