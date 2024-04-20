import express from "express";
import { create, getPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", create);
router.get("/getposts", getPosts);

export default router;