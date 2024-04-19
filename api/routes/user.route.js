import express from "express";
import { deleteUser, test, update } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", update);
router.delete("/delete/:userId", deleteUser);

export default router;