import type { GameList, User } from "@prisma/client";

export const getGames = async (favoriteGameIds?: string[]) => {
  if (!favoriteGameIds || !favoriteGameIds?.length) {
    return [];
  }

  const res = await fetch("/api/games", {
    method: "POST",
    body: `fields *,cover.*; where id = (${favoriteGameIds.join(
      ","
    )}); limit 500;`,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

export const getGameList = async ({ id }: { id: string }) => {
  const res = await fetch(`/api/games/lists/${id}`);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json() as Promise<GameList>;
};

export const getUser = async () => {
  const res = await fetch("/api/user");

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json() as Promise<User>;
};