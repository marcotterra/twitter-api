import User from "../models/user.model";
import Tweet from "../models/tweet.model";

const index = async (req, res) => {
  try {
    const response = await User.find().select("-_id -password");

    if (!response)
      return res
        .status(404)
        .json({ message: "User does'nt have content yet." });

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOne = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await User.findOne({ username }).select("-_id -password");

    if (!response)
      return res.status(404).json({ message: "User doesn't exist." });

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const response = await User.create(req.body);

    return res.json({ user: response, message: `${req.body.username} saved` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOneAndUpdate = async (req, res) => {
  const { name, about } = req.body;
  const { username } = req.params;

  try {
    const response = await User.findOneAndUpdate(
      { username },
      { name, about },
      { new: true }
    ).select("-_id -password");

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await User.findOneAndRemove(username);

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const auth = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user)
      // eslint-disable-line
      return res.json(404).json({ message: "Email not found" });

    const passwordHash = await user.compareHash(password);

    if (!passwordHash)
      return res.status(400).json({ message: "Wrong password" });

    const response = await user.toAuth();

    return res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.userData.id).select("-password");

    if (!user)
      // eslint-disable-line
      return Error("User was broken");

    const tweets = await Tweet.find({ user: user.id });

    console.log(user);

    return res.json({ user, tweets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const follow = async (req, res) => {
  try {
    const response = await User.findOneAndUpdate(
      { username: req.params.username },
      { $push: { followed: req.userData.id } },
      { safe: true, upsert: true }
    ).select("-_id -password");

    if (!response)
      return res.status(400).json({ message: "Someting has happen" });

    return res.json({ message: "Sucess" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const unfollow = async (req, res) => {
  try {
    const toFollow = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { followed: req.userData.id } },
      { safe: true, upsert: true }
    ).select("-_id -password");

    if (!toFollow)
      return res.status(400).json({ message: "Someting has happen" });

    return res.json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const followed = async (req, res) => {
  try {
    let response = {};

    if (req.params.username)
      response = await User.findOne({ username: req.params.username }).select(
        "-_id -password"
      );

    response = await User.findById(req.userData.id).select("-_id -password");

    return res.json(response["followed"]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  index,
  findOne,
  create,
  findOneAndUpdate,
  remove,
  auth,
  profile,
  follow,
  unfollow,
  followed
};
