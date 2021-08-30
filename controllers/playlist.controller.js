const {User} = require("../model/user.model")
const { PlayList} =require("../model/playlist.model")

const getAllPlaylist = async(req,res,next) =>{
    try {
        const {userId} = req.params;
        const playList = await PlayList.findOne({userId}).select("-__v -created_at").populate("playLists.videos")

        res.status(200).json({
            playList
        })

    } catch (error) {
        next(error)
    }
}
const addPlaylist = async (req,res,next)=>{
    try {
        const {userId} = req.params;
        const {playListName} = req.body;

        const foundUserData = await User.findById(userId);
        const foundPlayList = await PlayList.findOne({userId})
        if(!foundPlayList)
        {
            console.log("hello")
            const addPlaylist = new PlayList({userId,playLists:[{playListName,videos:[]}]})
            foundUserData.playLists = addPlaylist
            await foundUserData.save()

            const newPlayList = await(await addPlaylist.save()).populate("playLists.videos").execPopulate();

            res.status(201).json({message:"video added to playlist",playList:newPlayList})
        }
        else if(foundPlayList?.playLists?.length!==0){
            return foundPlayList.playLists.map(async(item)=>{
                if(item.playListName===playListName){
                    return  res.status(404).json({
                                    message:"playlist already exist"
                                })
                }
                else{
                    foundPlayList.playLists.push({playListName,videos:[]})
                    await foundPlayList.save()
                    return res.status(201).json({message:"video added to playlist",playList:foundPlayList})
                }
            })  
           
        }
        
    } catch (error) {
        next(error)
    }
}
const addVideoToPlayList = async (req,res,next) =>{
    try {
        const {userId,playListId} = req.params
        const {playListName,videoId} = req.body

        const foundUserData = await User.findById(userId)
        const foundPlayList = await PlayList.findOne({userId})

        if(foundPlayList ){            
            foundPlayList.playLists.map(item=>String(item._id)===String(playListId)?item.videos.push(videoId):item)
            
            foundUserData.playLists = foundPlayList
            await foundUserData.save()
            const newPlayList = await (await foundPlayList.save()).populate("playLists.videos").execPopulate()
            return res.status(201).json({
                message:"video added to playlist",
                playList:newPlayList
            })
        }

        const addToPlayList = new PlayList({userId,playLists: [{ playListName, videos: [videoId] }]})

        foundUserData.playLists=addToPlayList;
        await foundUserData.save()

        const newPlayList = await(await addToPlayList.save()).populate("playLists.videos").execPopulate();

        res.status(201).json({message:"video added to playlists",playList:newPlayList})

    } catch (error) {
        next(error)
    }
}

const removeVideoFromPlayList = async(req,res,next) =>{
    try {
        const {userId} = req.params;
        const {playListId,videoId} = req.body

        const foundPlayList = await PlayList.findOne({userId}).select("-__v")
        foundPlayList.playLists.map((playlist)=>{
            if(String(playlist._id)===String(playListId)){
                return (playlist.videos = playlist.videos.filter(video=>String(video)!==String(videoId)))
            }
        })

        const newPlayList = await (await foundPlayList.save()).populate("playLists.videos").execPopulate();
        res.json({success:true,message:"video removed from playlist",playList:newPlayList})

    } catch (error) {
        next(error)
    }

}

const removePlayList = async(req,res,next)=>{
    try {
        
        const {userId} = req.params;
        const {playListId} = req.body;

        const foundPlayList = await PlayList.findOne({userId}).select("-__v");
       
        foundPlayList.playLists= foundPlayList.playLists.filter(playlist=>String(playlist._id)!==String(playListId))

        const newPlayList = await (await foundPlayList.save()).populate("playLists.videos").execPopulate();
        res.json({success:true,message:"Playlist removed ",playList:newPlayList})
    } catch (error) {
        next(error)
    }
}


module.exports = { getAllPlaylist,addVideoToPlayList,removeVideoFromPlayList,addPlaylist, removePlayList}