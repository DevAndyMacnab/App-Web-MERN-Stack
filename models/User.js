const crypto = require('crypto');
const mongoose =require("mongoose");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const { error } = require('console');
const { hash } = require('bcrypt');

const UserShcema= new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please provide a username"]
    },
    lastname:{
        type:String,
        required:[true, "Please provide a lastname"]
    },

    registeracademic:{
        type:String,
        unique:true,
        required:[true, "Please provide a register academic"]
    },
    password:{
        type:String,
        required:[true, "Please provide a password"],
        minlength:6,
        select:false

    },
    email:{
        type:String,
        unique:true,
        required:[true, "Please provide an email"]
    },
    logged:{
        type:Boolean,
        required:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
    
})

UserShcema.pre("save", async function(next){
    
    if (!this.isModified("password")) {
        next();
      }
    
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    });

UserShcema.methods.matchPasswords= async function(password){
    return await bcrypt.compare(password, this.password);
}


UserShcema.methods.getSignedToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE})

}

UserShcema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
       
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    this.resetPasswordExpire= Date.now()+ 10*(60*1000);
    
    return resetToken;
}

UserShcema.methods.getSignedJwtToken = function(){
    return jwt.sign({id : this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}
const User= mongoose.model("User",UserShcema);

module.exports= User;