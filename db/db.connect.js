const mongoose = require("mongoose")


async function initializeDBConnection() {
    try{
        await mongoose.connect(process.env.db_Path,{
            useUnifiedTopology:true,
            useNewUrlParser:true    
        });
        console.log("successfully connected")
    } catch(error){
        console.error("mongoose connectio failed... ",error)
    }
}

module.exports = {initializeDBConnection};