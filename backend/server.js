const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path'); 

const { auth } = require('./Middlewares/auth');

const {
    RegisterUser,
    LoginUser,
    LogoutUser,
    getUsers,
    Validate    
} = require('./controller/authController');

const {
    createBoard,
    updateBoard,
    addTask,
    getBoard,
    getUserDetails,
    updateTask
} = require('./controller/oprController');

const port = process.env.PORT || 8081;

// Connect to MongoDB Atlas
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// API Endpoints
app.post('/api/register', RegisterUser);
app.post('/api/login', LoginUser);
app.post('/api/boards/createboard', auth, createBoard);
app.post('/api/boards/updateboard', auth, updateBoard);
app.post('/api/boards/addtask', auth, addTask);
app.post('/api/boards/updatetask', auth, updateTask);

app.get('/api/validate', auth, Validate);
app.get('/api/users', auth, getUsers);
app.get('/api/boards', auth, getUserDetails);
app.get('/api/boards/:id/Dashboard', auth, getBoard);
app.get('/api/logout', auth, LogoutUser);

// To serve React build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}

app.listen(port, () => {
  console.log(`Server running at Port:${port}`);
});
