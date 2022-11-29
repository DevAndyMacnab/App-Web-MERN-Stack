const mongoose= require("mongoose");

const connectDB = async()=>{
    await mongoose.connect(process.env.DATABASE,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
         
    })
    console.log("MONGODB is connected")
}
module.exports= connectDB;