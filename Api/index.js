const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/users.js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10);


app.use(express.json());

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);
console.log(process.env.MONGO_URL);

app.get('/test', (req, res) => {
  res.json('test ok');
});

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

app.listen(4000);