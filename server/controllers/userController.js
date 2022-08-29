import mongoose from "mongoose";
import { createError } from "../error.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Group from "../models/Group.js";

export const editUser = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "You can only edit your own account."));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Successfully deleted user.");
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "You can only delete your own account."));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const like = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      $addToSet: { likes: req.user.id },
      $pull: { dislikes: req.user.id },
    });
    res.status(200).json("You liked the post.");
  } catch (error) {
    next(error);
  }
};

export const dislike = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      $addToSet: { dislikes: req.user.id },
      $pull: { likes: req.user.id },
    });
    res.status(200).json("You disliked the post.");
  } catch (error) {
    next(error);
  }
};

export const follow = async (req, res, next) => {
  try {
    await Group.findByIdAndUpdate(req.params.id, {
      $addToSet: { subscribedUsers: req.user.id },
    });

    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { subscribedGroups: req.params.id },
    });

    res.status(200).json("Successfully followed group.");
  } catch (error) {
    next(error);
  }
};

export const unfollow = async (req, res, next) => {
  try {
    await Group.findByIdAndUpdate(req.params.id, {
      $pull: { subscribedUsers: req.user.id },
    });

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedGroups: req.params.id },
    });

    res.status(200).json("Successfully unfollowed group.");
  } catch (error) {
    next(error);
  }
};
