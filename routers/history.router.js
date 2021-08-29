const express = require("express");
const { getHistory, addToHistory, removeFromHistory } = require("../controllers/history.controller");
const checkAuth = require("../middelware/checkAuth");
const historyRouter = express.Router();

historyRouter.route("/:userId/history").all(checkAuth).get(getHistory).post(addToHistory)
historyRouter.route("/:userId/history/remove").all(checkAuth).post(removeFromHistory)

module.exports= historyRouter