const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HistorySchema = Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
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
);
const History = mongoose.model("History", HistorySchema);

module.exports = {
    History
}