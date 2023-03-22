const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const videoRoute = require("./routes/video");
const commentRoute = require("./routes/comment");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Work ☻"))
  .catch((err) => console.log(`Error ${err}`));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/video", videoRoute);
app.use("/api/comment", commentRoute);

// Handling Error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Wrong ~!";

  return res.status(status).json({ success: false, status, message });
});

app.listen(5000, () => console.log("Server Running ☻"));
