import User from "../models/user.model";

const index = async (req, res) => {
  try {
    const response = await User.find();

    if (response) {
      return res.json(response);
    } else {
      return res
        .status(404)
        .json({ message: "User does'nt have content yet." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOne = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await User.findOne(username);

    if (response) {
      return res.json(response);
    } else {
      return res.status(404).json({ message: "User doesn't exist." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  const { name, username, password, about } = req.body;

  try {
    const response = await User.create({ name, username, password, about });

    console.log(response);

    return res.json({ message: `${username} saved` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOneAndUpdate = async (req, res) => {
  const { name, about } = req.body;
  const { username } = req.params;

  try {
    const response = await User.findOneAndUpdate(
      username,
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

export { index, findOne, create, findOneAndUpdate, remove };
