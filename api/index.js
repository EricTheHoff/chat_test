import express from 'express';
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config.js';
import { UserModel } from './models/User.js';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken'

mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET
const app = express();
app.use(express.json())
const port = 4000;
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}))

app.get('/test', (req, res) => {
  res.json('Test successful');
})

app.post('/register', async (req, res) => {
  const {username, password} = req.body;
  const createdUser = await UserModel.create({username, password});
  jsonwebtoken.sign({userId: createdUser._id}, jwtSecret, {}, (err, token) => {
    if (err) throw err;
    res.cookie('token', token).status(201).json('Created')
  })
})

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`)
});