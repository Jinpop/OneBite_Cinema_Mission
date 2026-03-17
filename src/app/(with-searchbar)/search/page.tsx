import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import type { MovieData } from "@/types";

async function fetchSearchMovies(keyword: string): Promise<MovieData[]> {
  const url = `http://localhost:12345/movie${
    keyword ? `/search?q=${encodeURIComponent(keyword)}` : ""
  }`;

  try {
    const response = await fetch(url, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch search movies");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching search movies:", error);
    return [];
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const keyword = q?.trim() || "";
  const movies = await fetchSearchMovies(keyword);

  return (
    <div className={style.container}>
      <section className={style.section}>
        <h3>검색 결과</h3>
        <p className={style.summary}>
          {keyword ? `${keyword}` : "전체"} 기준 {movies.length}개의 영화를
          찾았어요
        </p>

        {movies.length === 0 ? (
          <div className={style.empty}>검색 결과가 없습니다.</div>
        ) : (
          <div className={style.movie_list}>
            {movies.map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
