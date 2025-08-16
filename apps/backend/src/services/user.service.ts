import { prisma } from "@brim/db/prisma";

export const getPublicUserProfile = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      brain: {
        select: {
          id: true,
          isPublic: true,
          items: {
            where: {
              isPublic: true,
            },
            select: {
              id: true,
              title: true,
              type: true,
              content: true,
              tags: {
                select: { id: true, name: true },
              },
            },
          },
        },
      },
    },
  });

  if (!user || !user.brain || !user.brain.isPublic) return null;

  return {
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      image: user.image,
    },
    brain: {
      id: user.brain.id,
      items: user.brain.items.map((i) => ({
        id: i.id,
        title: i.title,
        type: i.type,
        content: i.content,
        tags: i.tags.map((t) => t.name),
      })),
    },
  };
};

export const getPublicUserParticularItem = async (
  username: string,
  itemId: string
) => {
  const item = await prisma.item.findFirst({
    where: {
      id: itemId,
      isPublic: true,
      brain: {
        isPublic: true,
        user: {
          username,
        },
      },
    },
    select: {
      id: true,
      title: true,
      type: true,
      content: true,
      tags: {
        select: {
          name: true,
        },
      },
      brain: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!item) return null;

  return {
    user: {
      id: item.brain.user.id,
      username: item.brain.user.username,
      name: item.brain.user.name,
      image: item.brain.user.image,
    },
    brain: { id: item.brain.id },
    item: {
      id: item.id,
      title: item.title,
      type: item.type,
      content: item.content,
      tags: item.tags.map((t) => t.name),
    },
  };
};
