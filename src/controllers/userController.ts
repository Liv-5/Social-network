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

export const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } }, // $addToSet prevents duplicates
      { new: true }
    ).populate("friends", "-__v");

    // const { username, friendId } = req.body;
    // const { friendId } = req.params;

    // const newFriend = {
    //   username,
    //   friendId,
    // };

    // await User.findByIdAndUpdate(
    //   userId,
    //   { $push: { friends: newFriend } },
    //   { new: true, runValidators: true }
    // );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(201).json({ updateUser, message: "friend added!" });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } }, // $pull removes the friendId from friends array
      { new: true }
    ).populate("friends", "-__v");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res.json(updatedUser);

    // try {
    //   const user = await User.findOneAndUpdate(
    //     { _id: req.params.userId },
    //     { $pull: { friends: { friendId: req.body.friendId } } },
    //     { new: true }
    //   );

    //   if (!friendId) {
    //     res.status(404).json({ message: "No friend with this id!" });
    //   }

    //   res.json(friendId);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
