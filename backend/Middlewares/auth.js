// Middlewares/auth.js
const { User } = require('../Models/user');

const auth = async (req, res, next) => {
    
    try {
        // const token = req.cookies.authToken || req.headers.authorization?.replace('Bearer ', '');
        const token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4N2U5ZDYyNzE0YTI0MDY2NDhkY2UiLCJpYXQiOjE3MjI0MTgzMjQsImV4cCI6MTcyMjUwNDcyNH0.i4-JXwchQocY55EiGzixEUW53LOh1jfiJ6NrRn420Hk
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        if (!user || user.token !== token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = { auth };
