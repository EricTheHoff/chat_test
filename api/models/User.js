import mongoose from "mongoose";

// Schema for user model in MongoDB. Currently using username and password.
const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true,},
  password: String,
}, {timestamps: true});

export const UserModel = mongoose.model('User', UserSchema);