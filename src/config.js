import dotenv from "dotenv";

dotenv.config();

const config = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
  TWEET_PER_PAGE: process.env.TWEET_PER_PAGE,
  SECRET_KEY: process.env.SECRET_KEY
};

export default config;
