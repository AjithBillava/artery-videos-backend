const mongoose = require("mongoose")
const Schema = mongoose.Schema
const VideoSchema = new Schema({
        name:{
            type:String,
            required:[true,"Video name is required"]
        },
        imageURL:{
            type:String,
            required:[true,"Image URL is required"]
        },
        videoURL:{
            type:String,
            required:[true,"Video URL is required"]
        },
        duration:{
            type:String,
            required:[true,"Duration is required"]
        },
        details:{
            type:String,
            required:[true,"Details of video is required"]
        }
    },
    {
        timestamps: {
            createdAt: "created_at"
        }
    }
)


const Video = mongoose.model("Video",VideoSchema)


module.exports= {Video}