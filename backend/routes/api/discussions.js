const express = require("express");
const { Project, Discussion } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateDiscussion = [
  check("post")
    .exists({ checkFalsy: true })
    .withMessage("Discussion cannot be blank")
    .isLength({ min: 5 })
    .withMessage("Discussion cannot be less than five characters long"),
  handleValidationErrors,
];

// Get discussion
router.get("/:discussionId", requireAuth, async (req, res) => {
  const discussionId = req.params.discussionId;
  const discussion = await Project.findByPk(discussionId);

  if (!discussion) {
    res.status(404);
    return res.json({
      message: "Project couldn't be found",
    });
  }
  return res.json(discussion);
})

// Edit a discussion
router.put(
  "/:discussionId",
  requireAuth,
  validateDiscussion,
  async (req, res) => {
    const userId = req.user.id;
    const discussionId = req.params.discussionId;
    let { post, flag, devPost } = req.body;

    const discussion = await Discussion.findOne({
      where: {
        id: discussionId,
      },
    });

    if (!discussion) {
      res.status(404);
      return res.json({
        message: "Discussion doesn't exist",
      });
    }

    if (userId !== discussion.userId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
      });
    }

    const updateDiscussion = await Discussion.update(
      {
        post: post,
        flag: flag,
        devPost: devPost,
      },
      {
        where: {
          id: discussionId,
        },
      }
    );
    const updatedDiscussion = await Discussion.findByPk(discussionId)
    return res.json(updatedDiscussion);
  }
);

module.exports = router;
