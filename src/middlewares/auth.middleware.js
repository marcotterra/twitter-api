import jwt from "jsonwebtoken";
import { promisify } from "util";
import config from "../config";

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization)
      return res.status(401).json({ message: "Unauthorized access" });

    const token = authorization.split(" ")[1];

    const decoded = await promisify(jwt.verify)(token, config.SECRET_KEY);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default authMiddleware;
