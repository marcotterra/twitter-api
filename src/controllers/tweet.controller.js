import Tweet from "../models/tweet.model";

const index = async (req, res) => {
  try {
    const response = await Tweet.find();

    if (!response)
      return res.status(404).json({ message: " does'nt have any tweet yet." });

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const original = await Tweet.findById(req.params.id);

    if (!original)
      return res.status(404).json({ message: "Tweet doesn't exist." });

    const replies = await Tweet.find({ reply: original._id });

    return res.json({ tweet: original, replies: replies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const response = await Tweet.create({
      user: req.userData.id,
      content: req.body.content
    });

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOneAndUpdate = async (req, res) => {
  let { name, about } = req.body;
  let { id } = req.params;

  try {
    const response = await Tweet.findByIdAndUpdate(
      id,
      { name, about },
      { new: true }
    );

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  let { id } = req.params;

  try {
    const response = await Tweet.findById(id);

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { index, findOne, create, findOneAndUpdate, remove };
