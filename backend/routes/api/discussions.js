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
router.get("/:discussionId", async (req, res) => {
  const discussionId = req.params.discussionId;
  const discussion = await Discussion.findByPk(discussionId);

  if (!discussion) {
    res.status(404);
    return res.json({
      message: "Discussion doesn't exist",
    });
  }
  return res.json(discussion);
});

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
    const updatedDiscussion = await Discussion.findByPk(discussionId);
    return res.json(updatedDiscussion);
  }
);

// Deletes Project's Post
router.delete("/:discussionId", requireAuth, async (req, res) => {
  const discussionId = req.params.discussionId;
  const discussion = await Discussion.findByPk(discussionId);
  const project = await Project.findOne({
    where: { id: discussion.projectId },
  });
  if (!discussion) {
    return res.status(404).json({
      message: "Discussion doesn't exist",
    });
  }
  if (discussion.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
  await discussion.destroy();
  return res.json({
    project: project,
    message: "Successfully deleted",
  });
});

// Likes a discussion
router.put("/:discussionId/like", requireAuth, async (req, res) => {
  const discussionId = req.params.discussionId;
  let { likes } = req.body;
  const likeDiscussion = await Discussion.findOne({
    where: {
      id: discussionId,
    },
  });

  if (!likeDiscussion) {
    return res.status(404).json({
      message: "Discussion doesn't exist",
    });
  }

  likeDiscussion.set({
    likes: likes += 1,
  });
  await likeDiscussion.save()
  return res.json(likeDiscussion)
});

module.exports = router;
