const express = require("express");
const router = express.Router();
const Video = require("../models/Video");
const User = require("../models/User");
const { verifyToken } = require("../utils/verifyToken");

// Create Video
router.post("/create", verifyToken, async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body });

    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    res.status(500).json("Video not Created ~!!");
    next(error);
  }
});

// Update Video
router.put("/update/:id", verifyToken, async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    !video && res.status(500).json("Video not Found !~");

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updatedVideo);
    } else res.status(403).json("You Can Update Only Your Video !~");
  } catch (error) {
    next(error);
  }
});

// Delete Video
router.delete("/delete/:id", verifyToken, async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    !video && res.status(500).json("Video not Found !~");

    if (req.user.id === video.userId) {
      const deletedVideo = await Video.findByIdAndDelete(req.params.id);

      res.status(200).json(deletedVideo);
    } else res.status(403).json("You Can Delete Only Your Video !~");
  } catch (error) {
    next(error);
  }
});

// Get Video
router.get("/get/:id", async (req, res, next) => {
  try {
    const getVideo = await Video.findById(req.params.id);
    res.status(200).json(getVideo);
  } catch (error) {
    res.status(500).json("You Can Get Only Your Video !~");
    next(error);
  }
});

// Add View To Video
router.put("/view/:id", async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).json("Increased View ☻");
  } catch (error) {
    res.status(500).json("You are not watched ~!");
    next(error);
  }
});

// Random Video
router.get("/random", async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 30 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
});

// Trend Video
router.get("/trend", async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 }); // most views -1 || last views 1
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
});

// Sub Video (Confuse for me !!)
router.get("/sub", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );

    // res.status(200).json(list.flat()); // get Old
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt)); // get Modern
  } catch (error) {
    next(error);
    console.log(error);
  }
});

// Get Videos By Tags
router.get("/tags", async (req, res, next) => {
  const tags = req.query.tags.split(",");
  // console.log(tags);
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
});

// Get Videos By Search
router.get("/search", async (req, res, next) => {
  const q = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: q, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
