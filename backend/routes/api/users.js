const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// Sign up
router.post(
    '/',
    async (req, res) => {
      const { firstname, lastname, email, password, username, developer, companyName } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ firstname, lastname, email, username, hashedPassword, developer, companyName });

      const safeUser = {
        firstName: user.firstname,
        lastName: user.lastname,
        id: user.id,
        email: user.email,
        username: user.username,
        developer: user.developer,
        companyName: user.companyName,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );

module.exports = router;
