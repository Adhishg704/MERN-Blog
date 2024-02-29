import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import {validate, signupValidator, loginValidator } from "../utils/validators.js";

const router = express.Router();

router.post("/signup", validate(signupValidator), signup);
router.post("/signin", validate(loginValidator), signin);

export default router;