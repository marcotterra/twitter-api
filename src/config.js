import dotenv from "dotenv";

dotenv.config();

const config = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT
};

export default config;
