const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please enter name ']
    },
    email : {
        type : String,
        required : [true, 'Please enter valid email'],
        unique :true,
        validate : [validator.isEmail, 'Please enter valid email address']
    },
    password : {
        type :String,
        required : [true, 'Please enter password'],
        //maxlength : [8, 'Password connot exceed 12 characters'],
        minlength : [8, 'Passoword cannot lower than 8 characters'],
        select : false
    },
    avatar : {
        type :  String,
        required :true
    },
    role : {
        type :String,
        default : 'user'
    },
    resetPasswordToken : String ,
    resetPasswordTokenExpire : Date,
    createdAt : {
        type : Date,
        default : Date.now
    },

})

// Hashing passwords
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();  // Skip if password is not modified
    }
    try {
        //console.log('onsave', this.password);

        // Check if password exists before trying to hash it
        if (!this.password) {
            throw new Error('Password is required for hashing');
        }

        // Hash the password with 10 salt rounds*/
        this.password = await bcrypt.hash(this.password, 10);
        next();  // Continue to the next middleware after hashing


    } catch (err) {
        next(err);  // Pass the error to the next middleware
    }
});

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })

}

userSchema.methods.isValidPassword = async function(enteredPassword){
    /*console.log(enteredPassword);*/
   return bcrypt.compare(enteredPassword,this.password)

}

userSchema.methods.getResetToken = function(){
    //Generate token
    const token = crypto.randomBytes(20).toString('hex');

    //Generate Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    //Set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
    return token

}

let model = mongoose.model('User', userSchema);
module.exports = model;