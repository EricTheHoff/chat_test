import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { UserModel } from './models/User.js';
import 'dotenv/config.js';

// Middleware
mongoose.connect(process.env.MONGO_URL); // Using mongoose for object-modeling in MongoDB
const jwtSecret = process.env.JWT_SECRET // Secret JWT key
const salt = bcrypt.genSaltSync(10); // Salt level for bcrypt hashing

const app = express();
const port = 4000;
app.use(express.json()); // Allows Express to parse JSON data
app.use(cookieParser()); // Allows Express to parse cookie data
app.use(cors({ // Using CORS since my front-end is located on port 5173 and my back-end is running on port 4000
  credentials: true,
  origin: process.env.CLIENT_URL,
}))

app.get('/profile', (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jsonwebtoken.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    })
  } else {
    res.status(401).json('No token');
  }
})

app.post('/register', async (req, res) => { // Registration endpoint
  const {username, password} = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, salt); // Creating hashed password to store in MongoDB
    const createdUser = await UserModel.create({username, password: hashedPassword}); // Async operation to add user to MongoDB
    // Using jsonwebtoken to save the user's token to a cookie. Will use this cookie to verify login
    // createdUser._id refers to the id field for the user. Using an underscore to align with MongoDB conventions.
    jsonwebtoken.sign({userId: createdUser._id, username}, jwtSecret, {}, (err, token) => { // Parameter order for .sign is .sign(payload, secretOrPrivateKey, options, callback)
      if (err) throw err;
      // Sending response as a cookie
      res.cookie('token', token, {sameSite: 'lax'}).status(201).json({ // sameSite: 'lax' is the default behavior, may change this to none in the future, but will need a secure connection before doing so
        _id: createdUser._id,
      });
    });
  } catch(err) {
    if (err.code === 11000) { // MongoDB error code that throws if the username field is not unique
      res.status(400).json({error: 'Username already exists'})
    } else {
      res.status(500).json('An unexpected error has occurred');
    }
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await UserModel.findOne({username});

  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password);
    if (passOk) { // If the login is successful, update a cookie with the information from the logged-in user
      jsonwebtoken.sign({userId: foundUser._id, username}, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, {sameSite: 'lax'}).json({ // sameSite: 'lax' is the default behavior, may change this to none in the future, but will need a secure connection before doing so
          id: foundUser._id,
        })
      })
    }
  }
});

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`)
});