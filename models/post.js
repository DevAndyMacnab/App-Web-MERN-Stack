const mongoose = require("mongoose")



const PostSchema = new mongoose.Schema({
    username:{
        type:String,
        required:false
    },
    tipo:{
        type:String,
        required:true

    },
    
    message:{
        type:String,
        required:[true,"Please provide a message for the forum"]
    },
    date:{
        type:Date,
        required:false
    },
    comments:[]
    
})




const Post = mongoose.model("Post",PostSchema)
module.exports= Post