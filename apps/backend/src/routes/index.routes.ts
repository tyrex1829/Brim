import { Router } from "express";
import { auth } from "../lib/auth";
import { toNodeHandler } from "better-auth/node";
import { userRouter } from "./user.routes";

export const indexRouter: Router = Router();

indexRouter.use("/auth", toNodeHandler(auth));
indexRouter.use("/user", userRouter);
