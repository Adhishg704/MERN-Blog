import express from "express";
import { signup } from "../controllers/auth.controller.js";
import {validate, signupValidator } from "../utils/validators.js";

const router = express.Router();

router.post("/signup", validate(signupValidator), signup);

export default router;