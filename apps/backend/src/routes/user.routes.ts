import { Router } from "express";
import {
  UserProfile,
  UserParticularItem,
  updateUserProfile,
} from "../controller/user.controller";

import {
  createUserItem,
  updateUserItem,
  deleteUserItem,
} from "../controller/item.controller";

import { verifyUser } from "../middleware/auth.middleware";

export const userRouter: Router = Router();

userRouter.get("/@:username", verifyUser, UserProfile);

userRouter.get("/@:username/items/:itemId", verifyUser, UserParticularItem);

userRouter.patch("/@:username", verifyUser, updateUserProfile);

userRouter.post("@:username/items", verifyUser, createUserItem);

userRouter.patch("/@:username/items/:itemId", verifyUser, updateUserItem);

userRouter.delete("/@:username/items/:itemId", verifyUser, deleteUserItem);
