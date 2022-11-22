import mongoose from "mongoose";
const { Schema } = mongoose;


const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    profilePicture: String,
    about: String,
    livesIn: String,
    worksAt: String,
    country: String,
    followers: [],
    following: []
  },
  { timestamps: true }
)

const UserModel = mongoose.model('users', UserSchema);
export default UserModel;