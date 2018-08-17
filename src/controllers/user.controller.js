import User from "../models/user.model";
import Tweet from "../models/tweet.model";

const index = async (req, res) => {
  try {
    const response = await User.find();

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
    const response = await User.findOne({ username });

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
    );

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

    if (!user) // eslint-disable-line
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
    const user = await User.findById(req.userId);

    if (!user) // eslint-disable-line
      return res.json({ message: "error" });

    const tweets = await Tweet.find({ user: user._id });

    return res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { index, findOne, create, findOneAndUpdate, remove, auth, profile };
