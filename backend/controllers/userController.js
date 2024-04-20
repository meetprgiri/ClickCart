const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtTokens");

//Register a User 
exports.registerUser = catchAsyncError(async (req,res,next)=>{
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{  public_id: "This is sample id",
          url: "profilepicurl",
        }
    });

    sendToken(user,201,res);
})  


//Login User
exports.loginUser = catchAsyncError(async (req,res,next)=>{

    const {email, password} = req.body;

    //Checking if user given both email and password

    if( !email || !password){
        return next(new ErrorHandler("Please enter email and password"), 400);
    }

    const user = await User.findOne({ email }).select("password");

    if ( !user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if ( !isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401))
    }
   
    sendToken(user,200,res);
});


//Logout user
exports.logout = catchAsyncError(async(req,res,next)=>{

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logout successfully"
    });
});