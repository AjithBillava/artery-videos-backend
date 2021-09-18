const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const SavedVideosSchema = Schema({
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

const SavedVideos = mongoose.model("SavedVideos", SavedVideosSchema);

module.exports = {
    SavedVideos
}