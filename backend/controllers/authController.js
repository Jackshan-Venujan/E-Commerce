//authentication related request controllers
const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto');

//Register User - /api/v1/register
exports.registerUser = catchAsyncError(async(req,res,next)=>{
   // console.log(req.body);
    const {name,email,password,avatar} = req.body;

     // Validate input fields
     if (!name || !email || !password || !avatar) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, email, password, avatar) are required"
        });
    }

    //Create user
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    console.log("User saved successfully", user);

    sendToken(user,201,res);
});

// Login User - /api/v1/login
exports.loginUser = catchAsyncError(async (req,res,next) => {
    const {email, password} = req.body
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    //finding the user from database
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid email or password', 401))
    }


    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user,201,res);

})

// to remove the token cookie to control the logout
// authController.js

// Logout user - /api/v1/login
exports.logoutUser = (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

// Forgot Password - /api/v1/password/forgot
exports.forgotPassword = catchAsyncError( async (req, res, next)=>{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler('User not found with this email',404));
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave : false})

    //Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset url is as follows \n\n
    ${resetUrl}\n\n If you have not requested this email, then ignore it.`

    try{
        sendEmail({
            email : user.email,
            subject: "Electronics Shop Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message : `Email sent to ${user.email}`
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500));
    }

})


// Reset password - /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req,res,next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire : {
            $gt : Date.now()
        }
    })

    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or expired '))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match'))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave :false})

    sendToken(user, 200,res)

})

// Get User Profile - /api/v1/myprofile
exports.getUserProfile = catchAsyncError(async (req,res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
})

//Change Password
exports.changePassword = catchAsyncError( async( req,res,next) => {
    const user = await User.findById(req.user.id).select('+password');

    //Change old password - /api/v1/password/change
    if(await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('Old password is incorrect',401))

    }

    //Assigning new password 
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
        success : true,

    })

})

// Update Profile -
exports.updateProfile = catchAsyncError(async(req,res,next) => {
    const newUserData = {
        name : req.body.name,
        email : req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, { // as this function returing promise we add await
        new : true,
        runValidators : true

    })
    res.status(200).json({
        success :true,
        user
    });
});
