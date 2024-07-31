
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT = 10;
require('dotenv').config();
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required!'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'Email is required!'],
        trim:true,
        unique:1,
        maxlength:100
    },
    password:{
        type:String,
        required:[true,'Password is required!'],
        minlength:5
    },
    boards:[
        { type: mongoose.Schema.Types.ObjectId, ref: 'Board' }
    ],
    token:{
        type:String
    }
},
{
    timestamps: true
});

//Encrypt password, before saving
userSchema.pre('save', function (next) {
    var user = this;
    
    if (user.isModified('password')) //if password is changed 
    {
        bcrypt.genSalt(SALT, function (err, salt) {
            if (err) return next(err)
            
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash;
                next();
            });
        });
    } 
    else {
        next();
    }
});


userSchema.methods.comparePassword = function (candidatePassword, callBack) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callBack(err);
        callBack(null, isMatch);
    });
}


userSchema.methods.generateToken = function (callBack) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.KEY);
    user.token = token;
    user.save(function (err, user) {
        if (err) return callBack(err)
        callBack(null, user)
    });
};


userSchema.statics.findByToken = function (token, callBack) {
    var user = this;
    jwt.verify(token, process.env.KEY, function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return callBack(err);
            callBack(null, user);
        });
    });
};

const User = mongoose.model('User', userSchema);
module.exports = { User }