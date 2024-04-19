import express from "express";
import { test, update } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", update);

export default router;