import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import type { MovieData } from "@/types";

async function fetchAllMovies(): Promise<MovieData[]> {
  try {
    const response = await fetch(`http://localhost:12345/movie`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch all movies");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching all movies:", error);
    return [];
  }
}

async function fetchRecoMovies(): Promise<MovieData[]> {
  try {
    const response = await fetch(`http://localhost:12345/movie/random`, {
      next: { revalidate: 3 },
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

export default async function HomePage() {
  const [allMovies, recoMovies] = await Promise.all([
    fetchAllMovies(),
    fetchRecoMovies(),
  ]);

  return (
    <div className={style.container}>
      <section className={style.section}>
        <h3>지금 추천하는 영화</h3>
        <div className={style.recommended_list}>
          {recoMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>

      <section className={style.section}>
        <h3>모든 영화</h3>
        <div className={style.movie_list}>
          {allMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
