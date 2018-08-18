import express from "express";
import * as controller from "../controllers/tweet.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", controller.index);

router.get("/:id", controller.findOne);

router.post("/:id?", authMiddleware, controller.create);

router.put("/:id", authMiddleware, controller.findOneAndUpdate);

router.delete(":/id", authMiddleware, controller.remove);

export default router;
