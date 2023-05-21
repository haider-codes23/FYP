const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/users.js');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'adsfdfdsfsdfsdff';


app.use(express.json());

app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);
console.log(process.env.MONGO_URL);

app.get('/test', (req, res) => {
  res.json('test ok');
});


// Login user Api
app.post('/login', async (req, res) => {
  const {email, password} = req.body;
  
  const userDoc = await UserModel.findOne({email});
  if (userDoc) {
    const passwordIsOk = bcrypt.compareSync(password, userDoc.password);
    if (passwordIsOk) {
      // res.json('Password is okay');
      jsonWebToken.sign({email: userDoc.email, id: userDoc._id, name: userDoc.name}, jwtSecret, {}, (error, token) => {if(error) throw error;res.cookie('token', token).json(userDoc)});
      // res.cookie('token', )
    } else {
      res.status(422).json("Password not okay");
    }
  } else {
      res.json('User not Found');
  }

   
});

// Register user Api
app.post('/register', async (req, res) => {
  const {name, email, password} = req.body;

  try {
    const userDoc = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);

  } catch (exception) {
    res.status(422).json(exception);
  }

});

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  if (token) {
    jsonWebToken.verify(token, jwtSecret, {}, (error, user) => {
      res.json(user);
    });
  // console.log(decoded)
  // res.json(decoded)

  } else {
    res.json(null);
  }
  // res.json("USER INFO");
});

// logOut Api
app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
})



app.listen(4000);