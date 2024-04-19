import express from "express";
import { deleteUser, signout, test, update } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", update);
router.delete("/delete/:userId", deleteUser);
router.post("/signout", signout);

export default router;