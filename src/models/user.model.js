import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    about: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
