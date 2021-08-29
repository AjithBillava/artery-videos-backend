const {User} = require("../model/user.model")
const { History} = require("../model/history.model")

const getHistory = async(req,res,next) => {
    try {
        const {userId} = req.params;

        const history = await History.findOne({userId}).select("-__v -created_at").populate("videos")

        res.status(200).json({
            videos:history
        })
    } catch (error) {
        next(error)
    }
}

const addToHistory = async(req,res,next) =>{
    try {
        const {userId} = req.params;
        const {videoId } = req.body;
        console.log(userId,videoId)
        const foundUserData = await User.findById(userId);

        const foundUserHistory = await History.findOne({userId});
        console.log(foundUserData,foundUserHistory)
        
        if( foundUserHistory){
            foundUserHistory.videos.push(videoId);
            const updatedVideos = await (await foundUserHistory.save()).populate("videos").execPopulate()

            res.status(200).json({
                message:"video added to Saved vidoes",
                videos:updatedVideos
            })
        }

        const history = new History({userId,videos:[videoId]})
        foundUserData.history = history

        await foundUserData.save();
        const newHistory = await (await history.save()).populate("videos").execPopulate()
        res.status(200).json({
            // message:"video added to history",
            videos:newHistory
        })

    } catch (err) {
        next(error)
    }
}

const removeFromHistory = async(req,res,next) =>{
    try {
        
        const {userId} = req.params
        const {videoId} = req.body

        const history = await History.findOne({userId})
        history.videos = history.videos.filter(video=>String(video._id)!==String(videoId))

        const newHistory = await (await history.save()).populate("videos").execPopulate()

        res.status(201).json({message:"video deleted from History",videos:newHistory})

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getHistory,
    addToHistory,
    removeFromHistory
}