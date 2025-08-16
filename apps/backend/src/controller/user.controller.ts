import { Request, Response } from "express";
import {
  getPublicUserParticularItem,
  getPublicUserProfile,
} from "../services/user.service";

export const publicUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username } = req.params;

    const userProfile = await getPublicUserProfile(username);

    if (!userProfile) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(userProfile);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
};

export const publicUserParticularItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, itemId } = req.params;

    const publicItem = await getPublicUserParticularItem(username, itemId);

    if (!publicItem) {
      res.status(404).json({ error: "Item not found" });
      return;
    }

    res.status(200).json(publicItem);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
};
