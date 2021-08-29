const express = require("express");
const { getUserDetails, loginUser, registerUser } = require("../controllers/user.controller");
const checkAuth = require("../middelware/checkAuth");
const userRouter = express.Router();


userRouter.route("/").all(checkAuth).get(getUserDetails);
userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);

module.exports = userRouter;