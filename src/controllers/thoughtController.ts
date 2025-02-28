import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const user = await Thought.findById(thoughtId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: "not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const { thoughtText, createdAt, username } = req.body;
    const newThought = await Thought.create({
      thoughtText,
      createdAt,
      username,
    });
    res.status(201).json(newThought);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      // Return the updated document
      { new: true }
    );

    if (!thought) {
      res.status(404).json({ message: "No thought with this id!" });
    }

    res.json(thought);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    if (!thought) {
      res.status(404).json({
        message: "No thought with that ID",
      });
    } else {
      await User.deleteMany({ _id: { $in: thought.user } }); ///????
      res.json({ message: "thoughts and user deleted!" });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
