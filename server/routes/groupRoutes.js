import express from "express";
import {
  addGroup,
  deleteGroup,
  getGroup,
  getGroups,
  updateGroup,
} from "../controllers/groupController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addGroup);
router.delete("/:id", verifyToken, deleteGroup);
router.put("/:id", verifyToken, updateGroup);
router.get("/:id", getGroup);
router.get("/", getGroups);

export default router;
