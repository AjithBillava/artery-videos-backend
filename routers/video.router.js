const express = require("express");
const { getAllVideos, postVideo } = require("../controllers/video.controller");
const videoRouter = express.Router();

videoRouter.route("/").get(getAllVideos).post(postVideo);

module.exports = videoRouter