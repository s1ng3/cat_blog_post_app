const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const UserModel = require('./models/UserModel');
const PostModel = require('./models/PostModel');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5175"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.static('public'));

mongoose.connect('mongodb+srv://thomasdenes47:94JQVLLUSZmq5FJ6@dt.lw9e9pa.mongodb.net/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("The token is missing");
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json("The token is wrong");
            } else {
                req.email = decoded.email;
                req.username = decoded.username;
                next();
            }
        });
    }
};

app.get('/', verifyUser, (req, res) => {
    return res.json({ email: req.email, username: req.username });
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({ username, email, password: hash })
        .then(user => res.json(user))
        .catch(err => res.json(err));
    }).catch(err => console.log(err));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    const token = jwt.sign({ email: user.email, username: user.username }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json("Success");
                } else {
                    return res.json("Password is incorrect");
                }
            });
        } else {
            return res.json("User not exist");
        }
    });
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/create', verifyUser, upload.single('file'), (req, res) => {
    const fileBuffer = req.file.buffer;
    const base64File = fileBuffer.toString('base64');
    const mimeType = req.file.mimetype;

    PostModel.create({
      title: req.body.title,
      description: req.body.description,
      file: `data:${mimeType};base64,${base64File}`, // Store the base64 string
      email: req.body.email,
    })
    .then(result => res.json("Success"))
    .catch(err => res.json(err));
});

app.get('/getposts', (req, res) => {
    PostModel.find()
    .then(posts => res.json(posts))
    .catch(err => res.json(err));
});

app.get('/getpostbyid/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findById({ _id: id })
    .then(post => res.json(post))
    .catch(err => console.log(err));
});

app.put('/editpost/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndUpdate(
        { _id: id },
        { title: req.body.title, description: req.body.description }
    )
    .then(result => res.json("Success"))
    .catch(err => res.json(err));
});

app.delete('/deletepost/:id', (req, res) => {
    PostModel.findByIdAndDelete({ _id: req.params.id })
    .then(result => res.json("Success"))
    .catch(err => res.json(err));
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json("Success");
});

app.listen(3001, () => {
    console.log("Server is Running");
});
