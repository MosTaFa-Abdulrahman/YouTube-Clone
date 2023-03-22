const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Video = require("../models/Video");
const bcrypt = require("bcrypt");
const { verifyToken } = require("../utils/verifyToken");

// Update User
router.put("/update/:id", verifyToken, async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
      }
    } catch (error) {
      res.status(400).json(error);
      next(error);
    }

    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error);
      next(error);
    }
  } else res.status(403).json("You Can Update Only Your Account ~!");
});

// Get User
router.get("/get/:id", async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (error) {
    res.status(400).json("You Can Get Only Your Account ~!");
    next(error);
  }
});

// Delete User
router.delete("/delete/:id", verifyToken, async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const deleteUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json(deleteUser);
    } catch (error) {
      res.status(400).json(error);
      next(error);
    }
  } else res.status(403).json("You Can Delete Only Your Account ~!");
});

// Subscribe User
router.put("/sub/:id", verifyToken, async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, { $inc: { subscribers: 1 } });

    res.status(200).json("Subscribe Success ☻♦");
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
});

// unSubscribe User
router.put("/unsub/:id", verifyToken, async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, { $inc: { subscribers: -1 } });

    res.status(200).json("Unsubscribe ~~~");
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
});

// Like Video
router.put("/like/:videoId", verifyToken, async (req, res, next) => {
  try {
    const id = req.user.id;
    const videoId = req.params.videoId;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });

    res.status(200).json("Liked Video ☻♥");
  } catch (error) {
    next(error);
  }
});

// disLike Video
router.put("/dislike/:videoId", verifyToken, async (req, res, next) => {
  try {
    const id = req.user.id;
    const videoId = req.params.videoId;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });

    res.status(200).json("Unliked Video !~");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
