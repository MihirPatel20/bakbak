import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import AuthRoute from "./Routes/AuthRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UserRoute from "./Routes/UserRoute.js";


//Routes
const app = express();
app.use(cors())


//MiddleWare
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


dotenv.config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => app.listen(process.env.PORT, () => console.log(`Server has started on port ${process.env.PORT}`)))
  .catch((error) => console.log(error));


//Routing
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post',PostRoute)