import express from "express";
import { create, deletePost, getPosts, updatePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", create);
router.get("/getposts", getPosts);
router.delete("/deletepost", deletePost);
router.put("/updatepost", updatePost);

export default router;