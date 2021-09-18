const express = require("express");
const { getAllPlaylist, addPlaylist, addVideoToPlayList, removeVideoFromPlayList, removePlayList } = require("../controllers/playlist.controller");
const checkAuth = require("../middelware/checkAuth");
const playListRouter = express.Router();

playListRouter.route("/:userId/playlists").all(checkAuth).get(getAllPlaylist).post(addPlaylist)
playListRouter.route("/:userId/playlists/:playListId/remove").all(checkAuth).post(removePlayList)


playListRouter.route("/:userId/playlists/:playListId").all(checkAuth).post(addVideoToPlayList)
playListRouter.route("/:userId/playlists/:playListId/:videoId/remove").all(checkAuth).post(removeVideoFromPlayList)

module.exports = playListRouter