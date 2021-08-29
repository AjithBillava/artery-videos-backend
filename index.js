require('dotenv').config();

const express =  require("express")
const app = express()
const port = 3000;
const bodyParser = require("body-parser")
const cors = require("cors")
const {initializeDBConnection} = require("./db/db.connect")

const videos = require("./routers/video.router")
const likedVideos = require("./routers/likedVideo.router")
const savedVideos = require("./routers/savedVideos.router")
const history = require("./routers/history.router")
const playlists = require("./routers/playList.router")
const user = require("./routers/user.router")

initializeDBConnection()

app.use(bodyParser.json());
app.use(cors())
app.use("/v1/api/videos",videos)
app.use("/v1/api/user",user)
app.use("/v1/api/user",likedVideos)
app.use("/v1/api/user",savedVideos)
app.use("/v1/api/user",playlists)
app.use("/v1/api/user",history)

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "An error occurred, see the errorMessage key for more details",
		errorMessage: err.message,
	});
});

app.listen(process.env.PORT || port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})