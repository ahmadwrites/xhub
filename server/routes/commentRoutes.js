import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/commentController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Add, edit, delete, get comment for certain post
router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:id", getComments);

export default router;
