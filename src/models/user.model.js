import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    bio: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  async compareHash(password) {
    return await bcrypt.compare(password, this.password);
  },

  genJWT() {
    return new Promise((resolve, reject) => {
      const today = new Date();
      const exp = new Date(today);
      exp.setDate(today.getDate() + 60);

      const response = jwt.sign(
        {
          id: this._id,
          username: this.username,
          exp: parseInt(exp.getTime())
        },
        config.SECRET_KEY
      );

      if (response) // eslint-disable-line
        return resolve(response);

      return reject(new Error("Error on gen new token"));
    });
  },

  async toAuth() {
    const token = {
      name: this.name,
      username: this.username,
      bio: this.bio,
      token: await this.genJWT()
    };

    return token;
  }
};

export default mongoose.model("User", userSchema);
