import mongoose from "mongoose";
import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Group from "../models/Group.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const addGroup = async (req, res, next) => {
  try {
    const newGroup = new Group(req.body);
    await newGroup.save();
    res.status(200).json(newGroup);
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    const posts = await Post.find({ groupId: req.params.id });
    await Comment.deleteMany({ postId: posts[0]._id });
    await Post.deleteMany({ groupId: req.params.id });
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedGroups: req.params.id },
    });
    await Group.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted group.");
  } catch (error) {
    next(error);
  }
};

export const updateGroup = async (req, res, next) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedGroup);
  } catch (error) {
    next(error);
  }
};

export const getGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};

export const getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
};
