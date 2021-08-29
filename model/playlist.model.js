const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const PlayListSchema = Schema({
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        playLists:[
            {
                playListName: {
                    type:String,
                    required:[true,"Playlist name is required"]
                },
                videos:[    
                    {
                        type: Schema.Types.ObjectId,
                        ref: "Video",
                        // required:[true,"videoID is required"]
                    }
                ]
            }
        ]
    }, 
    {
        timestamps: {
            createdAt: 'created_at'
        }
    }
)

const PlayList = mongoose.model("PlayList", PlayListSchema);

module.exports = {
    PlayList
}