const express = require("express");
const { Project, Discussion, Vote, User } = require("../../db/models");
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
  const discussion = await Discussion.findByPk(discussionId, {
    include: { model: User },
  });

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
    include: { model: User, where: { id: req.user.id } },
    where: {
      id: discussionId,
    },
  });
  const votes = await Vote.findAll({ where: {discussionId: discussionId, userId: req.user.id }})

  if (votes) {
    const updateVote = await Vote.update(
      {
        liked: true
      },
      {
        where: {
          discussionId: discussionId,
          userId: req.user.id
        },
      }
    );
  }
  const updatedVote = await Vote.findOne(discussionId, {
    where: {userId: req.user.id}
  })

  return res.json(updatedVote)
  // if (!likeDiscussion) {
  //   return res.status(404).json({
  //     message: "Discussion doesn't exist",
  //   });
  // }

  // likeDiscussion.set({
  //   likes: likes,
  // });
  // await likeDiscussion.save();
  // return res.json(likeDiscussion);
});

// Dislikes a discussion
router.put("/:discussionId/dislike", requireAuth, async (req, res) => {
  const discussionId = req.params.discussionId;
  let { dislikes } = req.body;
  const dislikeDiscussion = await Discussion.findOne({
    where: {
      id: discussionId,
    },
  });

  if (!dislikeDiscussion) {
    return res.status(404).json({
      message: "Discussion doesn't exist",
    });
  }

  dislikeDiscussion.set({
    dislikes: dislikes,
  });
  await dislikeDiscussion.save();
  return res.json(dislikeDiscussion);
});

module.exports = router;
