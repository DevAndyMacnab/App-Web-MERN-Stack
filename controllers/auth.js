const { reset } = require("nodemon");
const User= require("../models/User")
const ErrorResponse= require("../utils/errorResponse")
const crypto= require("crypto")



exports.register= async (req,res,next)=>{
    const{username,lastname,email,registeracademic, password}=req.body;
    try {
        const user= await User.create({
            username, lastname,email,registeracademic,password,"logged":true
        });

        sendToken(user,201,res)
    } catch (error) {
        next(error);
        
    }
};

exports.login= async (req,res,next)=>{
    const {registeracademic, password}= req.body;
    if (!registeracademic || !password){
        return next(new ErrorResponse("Please provide a registeracademic and password",400))
        
    };


    try {
       const user = await User.findOne({registeracademic}).select("+password")
       
        if (!user){
            return next(new ErrorResponse("Invalid credentials",401))
        }

        const isMatch = await user.matchPasswords(password);
        if(!isMatch){
            return next(new ErrorResponse("Invalid credentials",401))
        }

        sendToken(user,200,res)
        console.log(user)
        return user

    } catch (error) {
        next(error);
    }
}

exports.Verperfil= async (req,res,next)=> {
    const usuario = req.params.username
    try {
        const {registeracademic}=req.params;
        console.log(registeracademic)
        const user= await User.findOne({registeracademic});
        if(!user)return res.json("no se encontro")
        return res.json(user);
    } catch (error) {
        res.json(error)
    }
}






exports.forgotPassword= async(req,res,next)=>{
    const {registeracademic,email}=req.body;
    try {
        const user= await User.findOne({registeracademic, email});

        if(!user){
            return next(new ErrorResponse("Invalid register academic or email",404))
        }
        
        const resetToken = user.getResetPasswordToken();
        
        await user.save();
        
        //const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
        
        
        try {
            

            res.status(200).json({succes:true, data: "Email sent", resetToken})
        } catch (error) {
            user.resetPasswordToken= undefined;
            user.resetPasswordExpire= undefined;
            
            user.save()
            return next(new ErrorResponse("Email could not be send",500))

        }
    } catch (error) {
        
        next(error) 
    }


};




exports.resetPassword= async (req,res,next)=>{
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
    try {
        const user = await User.findOne({
          resetPasswordToken,
          resetPasswordExpire: { $gt: Date.now() },
        });
    
        if (!user) {
          return next(new ErrorResponse("Invalid Token", 400));
        }
    
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
    
        res.status(201).json({
          success: true,
          data: "Password Updated Success",
          token: user.getSignedJwtToken(),
        });
      } catch (err) {
        
        next(err);
      }

};


const sendToken= (user,statusCode,res)=>{
    const token= user.getSignedToken();
    res.status(statusCode).json({succes: true, token,username:user.username})
}