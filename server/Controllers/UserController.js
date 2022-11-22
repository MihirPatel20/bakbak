import bcrypt from "bcrypt";
import UserModel from "../Models/UserModel.js";



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
  const { currentUserId, currentUserAdminStatus, password } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
      res.status(200).json(user);

    } catch (error) {
      res.status(500).json(error)
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
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Forbidden Action.")
  }

  else {
    try {
      const followUser = await UserModel.findById(id);
      const currentUser = await UserModel.findById(currentUserId);

      if (!followUser?.followers.includes(currentUserId)) {
        await followUser?.updateOne({$push: {followers: currentUserId}});
        await currentUser?.updateOne({$push: {following: id}});
        res.status(200).json(`${currentUser?.username} is now following ${followUser?.username}`)
      }
      else{
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
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Forbidden Action.")
  }

  else {
    try {
      const followUser = await UserModel.findById(id);
      const currentUser = await UserModel.findById(currentUserId);

      if (followUser?.followers.includes(currentUserId)) {
        await followUser?.updateOne({$pull: {followers: currentUserId}});
        await currentUser?.updateOne({$pull: {following: id}});
        res.status(200).json(`${currentUser?.username} has unfollowed ${followUser?.username}`)
      }
      else{
        res.status(403).json(`You are not following ${followUser?.username}`);
      }

    } catch (error) {
      res.status(500).json(error)
    }
  } 
}