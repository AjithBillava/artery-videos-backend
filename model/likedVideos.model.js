const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const LikedVideosSchema = Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }]
    }, 
    {
        timestamps: {
            createdAt: 'created_at'
        }
    }
)
const LikedVideos = mongoose.model("LikedVideos", LikedVideosSchema);

module.exports = {
    LikedVideos
}