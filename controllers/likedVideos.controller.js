const {User} = require("../model/user.model")
const {LikedVideos} = require("../model/likedVideos.model")

const getLikedVideos = async(req,res,next) => {
    try {
        const {userId} = req.params;

        const likedVideos = await LikedVideos.findOne({userId}).select("-__v -created_at").populate("videos")

        res.status(200).json({
            videos:likedVideos
        })
    } catch (error) {
        next(error)
    }
}

const addToLikedVideos = async(req,res,next) =>{
    try {
        const {userId} = req.params;
        const {videoId} = req.body;

        const foundUserData = await User.findById(userId);

        const foundUserLikedVideos = await LikedVideos.findOne({userId});

        if( foundUserLikedVideos){
            foundUserLikedVideos.videos.push(videoId);
            const updatedVideos = await (await foundUserLikedVideos.save()).populate("videos").execPopulate()

            res.status(200).json({
                message:"video added to liked vidoes",
                videos:updatedVideos
            })
        }

        const likedVideos = new LikedVideos({userId,videos:[videoId]})
        foundUserData.likedVideos = likedVideos

        await foundUserData.save();
        const newLikedVideos = await (await likedVideos.save()).populate("videos").execPopulate()

        res.status(200).json({
            message:"video added to liked videos",
            videos:newLikedVideos
        })

    } catch (err) {
        next(error)
    }
}

const removeFromLikedVideos= async(req,res,next) =>{
    try {
        
        const {userId} = req.params
        const {videoId} = req.body

        const likedVideos = await LikedVideos.findOne({userId})
        likedVideos.videos = likedVideos.videos.filter(video=>String(video._id)!==String(videoId))

        const newLikedVideos = await (await likedVideos.save()).populate("videos").execPopulate()

        res.status(201).json({message:"video deleted from History",videos:newLikedVideos})

    } catch (error) {
        next(error)
    }
}
module.exports = {
    getLikedVideos,
    addToLikedVideos,
    removeFromLikedVideos
}