const {Board} = require('../Models/board');
const mongoose = require('mongoose');


exports.createBoard = async (req, res) => {
    const board = new Board(req.body);
    board.members.push(req.user.email);
    
    await board.save((err, doc) => {
        if (err) {
            return res.status(422).json({
                errors: err
            })
        } else {
            req.user.boards.push(board._id);
            req.user.save();
            return res.status(200).json({
                success: true,
                message: 'Successfully Created'
            })
        }
    });
}

exports.updateBoard = async(req, res) => {
    await Board.findById(mongoose.Types.ObjectId(req.body.data.id), (err, board) => {
        if (!board) {
            return res.status(404).json({
                success: false,
                message: 'Board Not found!'
            });
        } else {
            if(req.body.data.name)
                board.name=req.body.data.name;
            if(req.body.data.description)
                board.description=req.body.data.description;
            if(req.body.data.members)
            {
                var mem = board.members.concat(req.body.data.members);
                board.members = mem.filter((item,pos)=>mem.indexOf(item)===pos);
            }
            board.save().then((response)=>{
                return res.status(200).json({
                    success: true,
                    message: req.body.data

                })
            }).catch((err)=>{
                console.log(err);
                return res.status(404).json({
                    success: true,
                    message: 'Something went wrong'
                })
            });  
               
        }
    });
}

exports.addTask = async(req, res) => {
    await Board.findOne({'_id': mongoose.Types.ObjectId(req.body.b_id)}, (err, board) => {
        if (!board) {
            return res.status(404).json({
                success: false,
                message: 'Board not found!'
            });
        } else {
            board.tasks.push(req.body.task);
            board.save();
            return res.status(200).json({
                success: true,
                message: 'Successfully Added'
            })
        }
    });
}

exports.updateTask = async(req, res) => {
    await Board.findOne({'_id': mongoose.Types.ObjectId(req.body.data.id)}, (err, board) => {
        if (!board) {
            return res.status(404).json({
                success: false,
                message: 'Board not found!'
            });
        } else {
            for(var i in board.tasks)
            {
                if(req.body.data.taskId==board.tasks[i]._id)
                {
                    board.tasks[i].name=req.body.data.name;
                    board.tasks[i].description = req.body.data.description;
                    board.tasks[i].stage = Number(req.body.data.stage);
                    board.tasks[i].members.push(req.body.data.member);
                    var mem = board.tasks[i].members.concat(req.body.data.member);
                    board.tasks[i].members = mem.filter((item,pos)=>mem.indexOf(item)===pos);
                }
            }
            
            board.save().then(()=>{
                return res.status(200).json({
                    success: true,
                    message: 'Successfully Added'
                })
            })
            .catch((er=>{
                console.log(er);
                return res.status(400).json({
                    success:false,
                    message:'Something Went Wrong'
                })
            }))
        }
    });
}

exports.getBoard = async(req, res) => {
    var b_id = req.params.id;
    await Board.findOne({'_id': mongoose.Types.ObjectId(b_id)}, (err, board) => {
        if (!board) {
            return res.status(404).json({
                success: false,
                message: 'Board not found!'
            });
        } else {
            return res.status(200).json({
                success: true,
                message: 'Successfully Send',
                data:board
            })
        }
    });
}

//get authenticated user details
exports.getUserDetails = async (req, res) => {
    var boards=[];
    await Board.find({ members:req.user.email},'name description members',(err, boards)=>{
        if (err) {
            return res.status(404).json({
                success: false,
                message: 'Something went Wrong!'
            });
        }
        else{
            return res.status(200).json({
                isAuthenticated: true,
                userID: req.user._id,
                name: req.user.name,
                email:req.user.email,
                boards:boards
            });
        }

    });
};