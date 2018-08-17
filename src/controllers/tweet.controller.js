import Tweet from "../models/tweet.model";
import config from "../config";

const index = async (req, res) => {
  let perPage = config.TWEET_PER_PAGE;
  let page = req.params.page || 1;
  try {
    const response = await Tweet.find({})
      .skip(perPage * page)
      .limit(parseInt(perPage));

    const count = await Tweet.countDocuments(response);

    if (!response)
      return res.status(404).json({ message: " does'nt have any tweet yet." });

    return res.json({
      tweets: response,
      pages: Math.ceil(count / perPage) - 1,
      current: parseInt(page)
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOne = async (req, res) => {
  let { id } = req.params;
  try {
    const original = await Tweet.findById(id);

    const replies = await Tweet.find({ reply: original._id });

    if (!original)
      return res.status(404).json({ message: "Tweet doesn't exist." });

    return res.json({ tweet: original, replies: replies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const response = await Tweet.create({
      user: req.userId,
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
