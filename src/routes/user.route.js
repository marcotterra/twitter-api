import express from "express";
import * as controller from "../controllers/user.controller";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", controller.index);

router.get("/u/:username", controller.findOne);

router.post("/", controller.create);

router.put("/:username", controller.findOneAndUpdate);

router.delete("/:username", controller.remove);

router.post("/auth", controller.auth);

router.get("/profile", auth, controller.profile);

router.post("/follow/:username?", auth, controller.follow);

router.get("/followed/:username?", controller.followed);

export default router;
