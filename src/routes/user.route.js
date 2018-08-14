import express from "express";
import * as controller from "../controllers/user.controller";

const router = express.Router();

router.get("/", controller.index);

router.get("/:username", controller.findOne);

router.post("/", controller.create);

router.put("/:username", controller.findOneAndUpdate);

router.delete(":/username", controller.remove);

export default router;
