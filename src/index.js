import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import config from "./config";
import userRouter from "./routes/user.route";
import tweetRouter from "./routes/tweet.route";

// Mongo connection
mongoose
  .connect(
    config.DB_URI,
    {
      autoReconnect: true,
      useNewUrlParser: true
    }
  )
  .catch(err =>
    console.error(`MongoDB connection failed with error: \n${err}`)
  );

const app = express();

// Dependencies
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.json({ created_by: "@marcotterra" });
});

app.use("/user", userRouter);
app.use("/tweet", tweetRouter);

app.listen(config.PORT, () => console.log(`Listening at port ${config.PORT}`));
