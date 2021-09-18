const {Video} = require("../model/video.model")

const getAllVideos = async(req,res,next)=>{
    try{
        const videos = await Video.find({}).select("-__v")
        res.status(200).json({
            message:"Videos found successfully",
            videos
        })
    }
    catch(error){
        next(error)
    }
}

const postVideo = async(req,res,next) =>{
    try {
        const recievedData = req.body
        const newVideo = await Video({...recievedData})

        const updatedVideo = await newVideo.save()

        res.status(200).json({
            message:"video added sucessfully",
            updatedVideo
        })

    } catch (error) {
       next(error)
    }
}

module.exports = {getAllVideos,postVideo}