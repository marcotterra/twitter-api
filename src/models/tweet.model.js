import mongoose from "mongoose";

const tweetSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    tweet: { type: String, required: true },
    reply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet"
    },
    like: { type: Number }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Tweet", tweetSchema);
