const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Video = require("../models/Video");
const { verifyToken } = require("../utils/verifyToken");

// Create Comment
router.post("/create", verifyToken, async (req, res, next) => {
  try {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
});

// Delete Comment  ||i have problem ("Cannot read property 'userId' of null")||
router.delete("/delete/:id", verifyToken, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);

    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Successful ☻♥");
    } else res.status(403).json("You can delete only your comment ~!");
  } catch (err) {
    next(err);
  }
});

// Get All Comments
router.get("/get/:videoId", async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
