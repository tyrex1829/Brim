import { prisma } from "@brim/db/prisma";

export const createItem = async (
  userId: string,
  username: string,
  data: {
    title?: string;
    type: string;
    content: string;
    isPublic?: boolean;
    isShareable?: boolean;
    tags?: string[];
  }
) => {
  const brain = await prisma.brain.findUnique({
    where: { userId },
    include: { user: true },
  });

  if (!brain || brain.user.username !== username) return null;

  const item = await prisma.item.create({
    data: {
      brainId: brain.id,
      title: data.title,
      type: data.type,
      content: data.content,
      isPublic: data.isPublic ?? false,
      isShareable: data.isShareable ?? false,
      tags:
        data.tags?.map((tag) => ({
          name: tag,
        })) ?? [],
    },
    include: { tags: true },
  });

  return item;
};

export const updateItem = async (
  username: string,
  userId: string,
  itemId: string,
  data: {
    title?: string;
    type?: string;
    content?: string;
    isPublic?: boolean;
    isShareable?: boolean;
    tags?: string[];
  }
) => {
  const item = await prisma.item.findFirst({
    where: { id: itemId, brain: { userId } },
    include: { tags: true, brain: { include: { user: true } } },
  });

  if (!item || item.brain.user.username !== username) return null;

  const updatedItem = await prisma.item.update({
    where: { id: itemId },
    data: {
      ...data,
      tags: data.tags
        ? {
            set: [], // clear existing tags
            create: data.tags.map((t) => ({ name: t })),
          }
        : undefined,
    },
    include: { tags: true },
  });

  return updatedItem;
};

export const deleteItem = async (
  username: string,
  userId: string,
  itemId: string
) => {
  const item = await prisma.item.findFirst({
    where: { id: itemId, brain: { userId } },
    include: { brain: { include: { user: true } } },
  });

  if (!item || item.brain.user.username !== username) return false;

  await prisma.item.delete({ where: { id: itemId } });

  return true;
};
