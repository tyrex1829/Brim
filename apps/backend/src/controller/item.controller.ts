import { Request, Response } from "express";
import { createItem, deleteItem, updateItem } from "../services/item.service";

export const createUserItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username } = req.params;

    const userId = req.user!.id;

    const { title, type, content, isPublic, isShareable, tags } = req.body;

    const newItem = await createItem(userId, username, {
      title,
      type,
      content,
      isPublic,
      isShareable,
      tags,
    });

    if (!newItem) {
      res.status(403).json({ error: "Failed to create item" });
      return;
    }

    res.status(201).json(newItem);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
};

export const updateUserItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, itemId } = req.params;

    const userId = req.user!.id;

    const { title, type, content, isPublic, isShareable, tags } = req.body;

    const updated = await updateItem(username, userId, itemId, {
      title,
      type,
      content,
      isPublic,
      isShareable,
      tags,
    });

    if (!updated) {
      res.status(403).json({ error: "Failed to update item" });
      return;
    }

    res.status(200).json(updated);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
};

export const deleteUserItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, itemId } = req.params;

    const userId = req.user!.id;

    const deleted = await deleteItem(username, userId, itemId);

    if (!deleted) {
      res.status(403).json({ error: "Failed to delete item" });
      return;
    }

    res.status(200).json({ message: "Item deleted successfully" });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
};
