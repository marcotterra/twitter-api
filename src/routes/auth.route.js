import express from "express";
import * as controller from "../controllers/user.controller";

const router = express.Router();

router.post("/login", controller.auth);

router.post("/register", controller.create);

export default router;
