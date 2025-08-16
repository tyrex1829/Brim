import { Router } from "express";
import {
  publicUserProfile,
  publicUserParticularItem,
} from "../controller/user.controller";

export const userRouter: Router = Router();

userRouter.get("/@:username", publicUserProfile);

userRouter.get("/@:username/itemId", publicUserParticularItem);
