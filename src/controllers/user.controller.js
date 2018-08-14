import User from "../models/user.model";

const index = async (req, res) => {
  try {
    const response = await User.find();

    if (response) {
      res.json(response);
    } else {
      res.status(404).json({ message: "User does'nt have content yet." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { index };
