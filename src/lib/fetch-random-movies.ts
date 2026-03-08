import type { MovieData } from "@/types";
import getApiServerUrl from "./get-api-server-url";

export default async function fetchRandomMovies(): Promise<MovieData[]> {
  const serverUrl = getApiServerUrl();
  const url = `${serverUrl}/movie/random`;

  try {
    const response = await fetch(url, {
      cache: "default",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch random movies");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching random movies:", error);
    return [];
  }
}
