import mongoose from "mongoose";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import { createError } from "../error.js";

export const addComment = async (req, res, next) => {
  try {
    const comment = new Comment({ userId: req.user.id, ...req.body });
    const savedComment = await comment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (req.user.id === comment.userId) {
    try {
      await Comment.findOneAndDelete(req.params.id);
      res.status(200).json("Successfully deleted comment");
    } catch (error) {}
  } else {
    next(createError(403, "You can only delete your own comment."));
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ groupId: req.params.id });
    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
};
