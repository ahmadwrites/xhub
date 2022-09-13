import express from "express";
import {
  addPost,
  deletePost,
  editPost,
  following,
  getPost,
  getPosts,
  groupPosts,
  search,
  trendingPosts,
  getUserPosts,
} from "../controllers/postController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, editPost);
router.delete("/:id", verifyToken, deletePost);
router.get("/", getPosts);
router.get("/find/:id", getPost);
router.get("/user/:id", getUserPosts);
router.get("/group/:id", groupPosts);
router.get("/trending", trendingPosts);
router.get("/search", search);
router.get("/following", verifyToken, following);

export default router;
