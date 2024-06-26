const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your first name"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your last name"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  "/",
  singleMulterUpload("image"),
  validateSignup,
  async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      username,
      country,
      developer,
      companyName,
    } = req.body;
    const profileImageUrl = req.file
      ? await singleFileUpload({ file: req.file, public: true })
      : null;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      hashedPassword,
      country,
      developer,
      companyName,
      profileImageUrl,
    });

    const safeUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      email: user.email,
      username: user.username,
      developer: user.developer,
      companyName: user.companyName,
      profileImage: user.profileImageUrl,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser,
    });
  }
);

module.exports = router;
