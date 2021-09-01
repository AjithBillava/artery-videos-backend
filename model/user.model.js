const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    firstname: {
        type: String,
        required: [true, "First name is required"]
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    history: [{
        type: Schema.Types.ObjectId,
        ref: "History"
    }],
    likedVideos: [{
        type: Schema.Types.ObjectId,
        ref: "LikedVideos"
    }],
    savedVideos:[{
      type: Schema.Types.ObjectId,
      ref:"SavedVideos"
    }],
    playLists:[{
        type: Schema.Types.ObjectId,
        ref:"PlayList"
    }]
  },
  {
    timestamps: {
        createdAt: "created_at"
    }
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };