const router = require("express").Router();
const sessionsRouter = require("./session.js");
const usersRouter = require("./users.js");
const projectsRouter = require("./projects.js");
const { restoreUser } = require("../../utils/auth.js");

// const { setTokenCookie } = require("../../utils/auth.js");
// const { User } = require("../../db/models");

router.use(restoreUser);
router.use("/session", sessionsRouter);

router.use("/users", usersRouter);

router.use("/projects", projectsRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

// // GET /api/restore-user
// router.get("/restore-user", (req, res) => {
//   return res.json(req.user);
// });

// // GET /api/set-token-cookie
// router.get("/set-token-cookie", async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: "Demo-lition",
//     },
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router;
