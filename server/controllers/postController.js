import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Group from "../models/Group.js";
import { createError } from "../error.js";
import Comment from "../models/Comment.js";

export const addPost = async (req, res, next) => {
  const newPost = new Post({ userId: req.user.id, ...req.body });

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const editPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(createError(404, "Post does not exist!"));

    if (req.user.id === post.userId) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } else {
      next(createError(403, "You can only edit your own post."));
    }
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(createError(404, "Post does not exist."));

    if (req.user.id === post.userId) {
      await Comment.deleteMany({ postId: post._id });
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("Successfully deleted post.");
    } else {
      next(createError(403, "You can only delete your own post."));
    }
  } catch (error) {}
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const groupPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ groupId: req.params.id });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const trendingPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ likes: -1, createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;

  try {
    const posts = await Post.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const following = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const followedGroups = user.subscribedGroups;

    const list = await Promise.all(
      followedGroups.map((groupId) => {
        return Post.find({ groupId: groupId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ userId: user._id });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
