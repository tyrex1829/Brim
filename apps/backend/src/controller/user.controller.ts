import { Request, Response } from "express";
import {
  getPublicUserProfile,
  getOwnerUserProfile,
  getPublicUserItem,
  getOwnerUserItem,
} from "../services/user.service";

export const UserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username } = req.params;

    const isOwner = req.user?.username === username;

    const profile = isOwner
      ? await getOwnerUserProfile(username)
      : await getPublicUserProfile(username);

    if (!profile) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(profile);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
};

export const UserParticularItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, itemId } = req.params;

    const isOwner = req.user?.username === username;

    const item = isOwner
      ? await getOwnerUserItem(username, itemId)
      : await getPublicUserItem(username, itemId);

    if (!item) {
      res.status(404).json({ error: "Item not found or not public" });
      return;
    }

    res.status(200).json(item);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {};
