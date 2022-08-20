import express from "express";
import {
  deleteUser,
  dislike,
  editUser,
  follow,
  getUser,
  like,
  unfollow,
} from "../controllers/userController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/edit/:id", verifyToken, editUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/find/:id", getUser);
router.put("/like/:id", verifyToken, like);
router.put("/dislike/:id", verifyToken, dislike);
router.put("/follow/:id", verifyToken, follow);
router.put("/unfollow/:id", verifyToken, unfollow);

export default router;
