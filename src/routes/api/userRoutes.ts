import { Router } from "express";
const router = Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} from "../../controllers/userController.js";

// /api/users

router.route("/").get(getAllUsers).post(createUser);

// /api/users/:userId

router.route("/:userId").get(getUserById).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

export { router as userRouter };
