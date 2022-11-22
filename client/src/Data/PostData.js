import post1 from "../images/cover-photos/post1.jpg"
import post2 from "../images/cover-photos/post2.jpg"
import post3 from "../images/cover-photos/post3.jpg"
import post4 from "../images/cover-photos/post6.jpg"
import { Friends } from "./FriendsData"

export const PostData = [
  {
    name: Friends[0].name,
    username: Friends[0].username,
    image: Friends[0].image,
    desc: "My new post!",
    postImage: post1,
    liked: true,
    likes: 325,
    time: "10 aug, 6.32 PM"
  },
  {
    name: Friends[1].name,
    username: Friends[1].username,
    image: Friends[1].image,
    desc: "My new post!",
    postImage: post2,
    liked: true,
    likes: 163,
    time: "12 sep - 6.32 PM"
  },
  {
    name: Friends[3].name,
    username: Friends[3].username,
    image: Friends[3].image,
    desc: "My new post!",
    postImage: post3,
    liked: false,
    likes: 416,
    time: "25 july - 6.32 PM"
  },
  {
    name: Friends[4].name,
    username: Friends[4].username,
    image: Friends[4].image,
    desc: "My new post!",
    postImage: post4,
    liked: true,
    likes: 864,
    time: "14 aug - 6.32 PM"
  }
]