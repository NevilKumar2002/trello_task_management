const { User} = require('../Models/user');

//register
exports.RegisterUser = async (req, res) => {
    const user = new User(req.body);
    console.log('User', user);
    await user.save((err, doc) => {
        if (err) {
            return res.status(422).json({
                errors: err
            })
        } else {
            const userData = {
                name: doc.name,
                email:doc.email
            }
            return res.status(200).json({
                success: true,
                message: 'Successfully Registered',
                userData
            })
        }
    });
}

exports.getUsers = async (req,res) => {
    await User.find({}, 'email' , (err,users)=>{
        if(!users){
            return res.status(404).json({
                success: false,
                message: 'Users not found!'
            })
        }
        else{
            return res.status(200).json({
                success:true,
                message:users
            })
        }
    })
}
//login
exports.LoginUser = (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if (!user) {
            console.log(err);
            return res.status(404).json({
                success: false,
                message: 'Email not found!'
            });
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.status(400).json({
                        success: false,
                        message: 'Wrong Password!'
                    });
                } else {
                    user.generateToken((err, user) => {
                        if (err) {
                            return res.status(400).send({
                                err
                            });
                        } else {
                            //saving token to cookie
                            res.cookie('authToken', user.token).status(200).json({
                                success: true,
                                message: 'Successfully Logged In!',
                                token:user.token,
                                userID: user._id,
                                name: user.name,
                                email:user.email,
                                boards:user.boards
                            })
                        }
                    });
                }
            });
        }
    });
}

//logout
exports.LogoutUser = (req, res) => {
    User.findByIdAndUpdate({_id: req.user._id}, {token: ''},
        (err) => {
            if (err) return res.json({
                success: false,
                err
            })
            return res.status(200).send({
                success: true,
                message: 'Successfully Logged Out!'
            });
        })
}

exports.Validate = (req, res) => {
    return res.status(200).send({
        isAuth:true
    })
}