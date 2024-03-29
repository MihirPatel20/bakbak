import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import UserModel from "../Models/UserModel.js";



//get all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find()

    users = users.map(user => {
      const { password, ...otherDetails } = user._doc
      return otherDetails
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

//Get User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    }
    else {
      res.status(404).json("user does not exists!")
    }

  } catch (error) {
    res.status(500).json(error)
  }
}



//Update User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;

  if (id === _id) {
    try {

      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt)
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })

      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      )
      res.status(200).json({ user, token });

    } catch (error) {
      res.status(500).json(error);
    }
  }

  else {
    res.status(400).json("Access denied! Unauthorised action. You can only update your own profile")
  }
}



//Delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id)
      res.status(200).json("User deleted Successfully.")
    } catch (error) {
      res.status(500).json(error)
    }
  }

  else {
    res.status(400).json("Access denied! Unauthorised action. You can only delete your own profile")
  }
}



//Follow User
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Forbidden Action.")
  }

  else {
    try {
      const followUser = await UserModel.findById(id);
      const currentUser = await UserModel.findById(_id);

      if (!followUser?.followers.includes(_id)) {
        await followUser?.updateOne({ $push: { followers: _id } });
        await currentUser?.updateOne({ $push: { following: id } });
        res.status(200).json(`${currentUser?.username} is now following ${followUser?.username}`)
      }
      else {
        res.status(403).json(`You are already following ${followUser?.username}`);
      }

    } catch (error) {
      res.status(500).json(error)
    }
  }
}




//UnFollow User
export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Forbidden Action.")
  }

  else {
    try {
      const followUser = await UserModel.findById(id);
      const currentUser = await UserModel.findById(_id);

      if (followUser?.followers.includes(_id)) {
        await followUser?.updateOne({ $pull: { followers: _id } });
        await currentUser?.updateOne({ $pull: { following: id } });
        res.status(200).json(`${currentUser?.username} has unfollowed ${followUser?.username}`)
      }
      else {
        res.status(403).json(`You are not following ${followUser?.username}`);
      }

    } catch (error) {
      res.status(500).json(error)
    }
  }
}