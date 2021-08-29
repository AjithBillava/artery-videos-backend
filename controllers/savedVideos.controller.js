const {User} = require("../model/user.model")
const { SavedVideos} = require("../model/savedVideos.model")

const getSavedVideos = async(req,res) => {
    try {
        const {userId} = req.params;

        const savedVideos = await SavedVideos.findOne({userId}).select("-__v -created_at").populate("videos")

        res.status(200).json({
            videos:savedVideos
        })
    } catch (error) {
        next(error)
    }
}

const addToSavedVideos = async(req,res) =>{
    try {
        const {userId} = req.params;
        const {videoId } = req.body;

        const foundUserData = await User.findById(userId);

        const foundUserSavedVideos = await SavedVideos.findOne({userId});

        if( foundUserSavedVideos){
            foundUserSavedVideos.videos.push(videoId);
            const updatedVideos = await (await foundUserSavedVideos.save()).populate("videos").execPopulate()

            res.status(200).json({
                message:"video added to Saved vidoes",
                videos:updatedVideos
            })
        }

        const savedVideos = new SavedVideos({userId,videos:[videoId]})
        foundUserData.savedVideos = savedVideos

        await foundUserData.save();
        const newSavedVideos = await (await savedVideos.save()).populate("videos").execPopulate()

        res.status(200).json({
            message:"video added to Saved videos",
            videos:newSavedVideos
        })

    } catch (err) {
        next(error)
    }
}


const removeFromSavedVideos = async(req,res,next) =>{
    try {
        
        const {userId} = req.params
        const {videoId} = req.body

        const savedVideos = await History.findOne({userId})
        savedVideos.videos = SavedVideos.videos.filter(video=>String(video._id)!==String(videoId))

        const newSavedVideos = await (await savedVideos.save()).populate("videos").execPopulate()

        res.status(201).json({message:"video deleted from History",videos:newSavedVideos})

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getSavedVideos,
    addToSavedVideos,
    removeFromSavedVideos
}