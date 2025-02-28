import { Request, Response } from "express";
// import { ObjectId } from "mongodb";
import { User } from "../models/index.js";

export const totalUsers = async () => {
  const numberOfUsers = await User.aggregate().count("numberOfUsers");
  return numberOfUsers;
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();

    const userNum = {
      users,
      totalUsers: await totalUsers(),
    };

    res.json(userNum);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json({
        user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.userId,
    });

    if (!user) {
      return res.status(404).json({ message: "No such user exists" });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
