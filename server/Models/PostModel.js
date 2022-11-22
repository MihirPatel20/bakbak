import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    userId: { type: String, require: true },
    desc: String,
    image: String,
    likes: []
  },
  {
    timestamps: true
  }
);

const PostModel = mongoose.model("posts", PostSchema)
export default PostModel;