const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/users.js');
const PlacesModel = require('./models/places.js')
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fileSystem = require('fs');
require('dotenv').config();


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'adsfdfdsfsdfsdff';


app.use(express.json());

app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

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
    jsonWebToken.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      const {name, email, _id} = await UserModel.findById(userData.id);

      res.json({name, email, _id});
    });

  } else {
    res.json(null);
  }
  // res.json("USER INFO");
});

// logOut Api
app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

//Api for uploading pictures  using link
app.post('/upload-by-link', async (req, res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpeg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  })
  res.json(newName);
});

//middleware for uploading pictures
const photosMiddleware = multer({dest: 'uploads/'});

//Api for uploading pictures from computer
app.post('/upload', photosMiddleware.array('photos', 100) ,(req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path, originalname} = req.files[i];
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    const newPath = path + '.' + extension;
    fileSystem.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads', ''));
  }
  res.json(uploadedFiles);
});

//Api endpoint for Submiting Form Data
app.post('/places', (req, res) => {
  const {token} = req.cookies;
  const {title, address, photos:addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxRoomies, price} = req.body;
  jsonWebToken.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;
    const placeDoc = await PlacesModel.create({
      owner: userData.id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxRoomies,
      price

    })
    res.json(placeDoc);

    
  });
});

// Api for getting all the places from /places
app.get('/user-places', (req, res) => {
  const {token} = req.cookies;
  jsonWebToken.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json(await PlacesModel.find({owner:id}))
  })
  
});

// Api for getting places of a user with specific id
app.get('/places/:id',async (req, res) => {
  const {id} = req.params;
  res.json(await PlacesModel.findById(id));
});

//Api for updating place 
app.put('/places', async (req, res) => {
  const {token} = req.cookies;
  const {id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxRoomies, price} = req.body;
  jsonWebToken.verify(token, jwtSecret, {}, async (err, userData) => {
    const placeDoc = await PlacesModel.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({title, address, photos:addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxRoomies, price});
      await placeDoc.save();
      res.json('ok');
   }
  })
});

// Api endpoint for listing places on indexPage
app.get('/places',async (req, res) => {
  res.json(await PlacesModel.find());
})




app.listen(4000);