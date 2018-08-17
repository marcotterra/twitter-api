import express from "express";
import * as controller from "../controllers/tweet.controller";

const router = express.Router();

router.get("/p/:page?", controller.index);

router.get("/:id", controller.findOne);

router.post("/", controller.create);

router.put("/:id", controller.findOneAndUpdate);

router.delete(":/id", controller.remove);

export default router;
