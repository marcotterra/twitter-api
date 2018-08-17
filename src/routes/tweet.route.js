import express from "express";
import * as controller from "../controllers/tweet.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/p/:page?", authMiddleware, controller.index);

router.get("/:id", authMiddleware, controller.findOne);

router.post("/", authMiddleware, controller.create);

router.put("/:id", authMiddleware, controller.findOneAndUpdate);

router.delete(":/id", authMiddleware, controller.remove);

export default router;
