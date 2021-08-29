const express = require("express");
const { getSavedVideos, addToSavedVideos, removeFromSavedVideos } = require("../controllers/savedVideos.controller");
const checkAuth = require("../middelware/checkAuth");
const savedVideosRouter = express.Router();

savedVideosRouter.route("/:userId/savedVideos/").all(checkAuth).get(getSavedVideos).post(addToSavedVideos)
savedVideosRouter.route("/:userId/savedVideos/:videoId/remove").all(checkAuth).post(removeFromSavedVideos)

module.exports  = savedVideosRouter