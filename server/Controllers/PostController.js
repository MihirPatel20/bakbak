import mongoose from "mongoose";
import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";


//Create a new Post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body)

  try {
    await newPost.save();
    res.status(200).json(newPost)
  } catch (error) {
    res.status(500).json(error)
  }
}



// Get a Post
export const getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error)
  }
}



//Update a Post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (userId === post.userId) {
      await post?.updateOne({ $set: req.body })
      res.status(200).json("Post Updated Succesfully");
    }
    else {
      res.status(403).json("Unauthorised Action!")
    }
  } catch (error) {
    res.status(500).json(error)
  }
}



//Delete a Post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {

    const post = await PostModel.findById(postId);
    if (userId === post?.userId) {
      await post?.deleteOne();
      res.status(200).json("Post Successfully deleted.")
    }
    else {
      res.status(403).json("Unauthorised Action!")
    }

  } catch (error) {
    res.status(500).json(error)
  }
}



//Like a Post
export const likePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId)

    if (!post?.likes.includes(userId)) {
      await post?.updateOne({ $push: { likes: userId } })
      res.status(200).json("You Liked a Post")
    }
    else {
      await post?.updateOne({ $pull: { likes: userId } })
      res.status(200).json("You Unliked a Post")
    }

  } catch (error) {
    res.status(500).json(error)
  }
}



//Get Timeline Posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const userPosts = await PostModel.find({ userId: userId })
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts"
        }
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0
        }
      }

    ])

    res
      .status(200)
      .json(userPosts.concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
      );

  } catch (error) {
    res.status(500).json(error)
  }
}