const express = require("express");
const { getLikedVideos, addToLikedVideos, removeFromLikedVideos } = require("../controllers/likedVideos.controller");
const checkAuth = require("../middelware/checkAuth");
const likedVideosRouter = express.Router();

likedVideosRouter.route("/:userId/likedVideos").all(checkAuth).get(getLikedVideos).post(addToLikedVideos)
likedVideosRouter.route("/:userId/likedVideos/:videoId/remove").all(checkAuth).post(removeFromLikedVideos)

module.exports = likedVideosRouter