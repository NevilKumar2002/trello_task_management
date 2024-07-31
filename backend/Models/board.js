require('dotenv').config();
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Task Name is required!"],
        maxlength:100
    },
    description:{
        type:String,
        maxlength:200
    },
    members:[
        { type: String }
    ],
    stage:{
        type:Number,
        default:0
    }
});

const boardSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name can not be empty!"],
        maxlength:100
    },
    description:{
        type:String, 
        maxlength:300
    },
    members:[
        {
            type:String
        }
    ],
    tasks:[
        {
            type:taskSchema
        }
    ]
})

const Board = mongoose.model('Board', boardSchema);
module.exports = { Board }