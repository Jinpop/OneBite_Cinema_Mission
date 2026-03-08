import type { MovieData } from "@/types";
import getApiServerUrl from "./get-api-server-url";

export default async function fetchMovies(q?: string): Promise<MovieData[]> {
  const serverUrl = getApiServerUrl();
  const url = `${serverUrl}/movie${q ? `/search?q=${encodeURIComponent(q)}` : ""}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}
