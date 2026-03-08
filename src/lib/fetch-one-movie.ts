import type { MovieData } from "@/types";
import getApiServerUrl from "./get-api-server-url";

export default async function fetchOneMovie(
  id: number,
): Promise<MovieData | null> {
  const serverUrl = getApiServerUrl();
  const url = `${serverUrl}/movie/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
}
