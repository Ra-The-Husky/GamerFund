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

// Likes/Unlike a discussion
router.put("/:discussionId/like", requireAuth, async (req, res) => {
  const discussionId = req.params.discussionId;
  let { likes, dislikes } = req.body;

  const discussion = await Discussion.findOne({
    // include: { model: User, where: { id: req.user.id } },
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

  const vote = await Vote.findOne({
    where: { discussionId: discussionId, userId: req.user.id },
  });
  console.log(vote, "VOTE");

  if (!vote) {
    const newVote = Vote.build({
      userId: req.user.id,
      discussionId: discussionId,
      liked: true,
      disliked: false,
    });
    discussion.set({
      likes: likes + 1,
    });
    await newVote.save();
    await discussion.save();
    res.status(201);
    return res.json(discussion);
  }
  if (vote.liked === true) {
    vote.set({
      liked: false,
    });
    await vote.save();
    discussion.set({
      likes: likes - 1,
    });
    await discussion.save();
    return res.json(discussion);
  }
  if (vote.liked === false && vote.disliked === true) {
    vote.set({
      liked: true,
      disliked: false,
    });
    await vote.save();
    discussion.set({
      likes: likes + 1,
      dislikes: dislikes - 1,
    });
    await discussion.save();
    return res.json(discussion);
  }
  if (vote.liked === false) {
    vote.set({
      liked: true,
    });
    await vote.save();
    discussion.set({
      likes: likes + 1,
    });
    await discussion.save();
    return res.json(discussion);
  }
});

// Dislikes a discussion
router.put("/:discussionId/dislike", requireAuth, async (req, res) => {
  const discussionId = req.params.discussionId;
  let { likes, dislikes } = req.body;

  const discussion = await Discussion.findOne({
    // include: { model: User, where: { id: req.user.id } },
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

  const vote = await Vote.findOne({
    where: { discussionId: discussionId, userId: req.user.id },
  });

  if (!vote) {
    const newVote = Vote.build({
      userId: req.user.id,
      discussionId: discussionId,
      liked: false,
      disliked: true,
    });
    discussion.set({
      dislikes: dislikes += 1,
    });
    await newVote.save();
    await discussion.save();
    res.status(201);
    return res.json(discussion);
  }
  if (vote.disliked === true) {
    vote.set({
      disliked: false,
    });
    await vote.save();
    discussion.set({
      dislikes: dislikes -= 1,
    });
    await discussion.save();
    return res.json(discussion);
  }
  if (vote.disliked === false && vote.liked === true) {
    vote.set({
      liked: false,
      disliked: true,
    });
    await vote.save();
    discussion.set({
      likes: likes -= 1,
      dislikes: dislikes + 1,
    });
    await discussion.save();
    return res.json(discussion);
  }
  if (vote.disliked === false) {
    vote.set({
      disliked: true,
    });
    await vote.save();
    discussion.set({
      dislikes: dislikes += 1,
    });
    await discussion.save();
    return res.json(discussion);
  }

});

module.exports = router;
