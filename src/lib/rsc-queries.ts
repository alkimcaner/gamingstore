import { get } from "@vercel/edge-config";
import { Movie } from "../types/movies";
import { PopularMovies } from "@/types/movies";

export const getGames = async (payload: string) => {
  try {
    if (!payload) return [];

    const options = {
      method: "POST",
      headers: {
        "Client-ID": process.env.IGDB_ID ?? "",
        Authorization: `Bearer ${await get("igdb_token")}`,
      },
      body: payload,
    };

    const res = await fetch("https://api.igdb.com/v4/games", options);

    return res.json();
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getMovie = async (id: string) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en&append_to_response=images,videos`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to reach TMDB API");
    }

    return res.json() as Promise<Movie>;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getPopularMovies = async (page: number) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to reach TMDB API");
    }

    return res.json() as Promise<PopularMovies>;
  } catch (error) {
    console.error(error);
    return;
  }
};
