import mongoose from "mongoose";
import { createError } from "../error.js";
import Group from "../models/Group.js";

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
