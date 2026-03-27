import { Suspense } from "react";
import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import type { MovieData } from "@/types";
import { delay } from "@/util/delay";

async function RecoMovies() {
  await delay(2400);

  const response = await fetch("http://localhost:12345/movie/random", {
    next: { revalidate: 3 },
  });

  if (!response.ok) {
    return <div>추천 영화를 불러오지 못했습니다.</div>;
  }

  const recoMovies: MovieData[] = await response.json();

  return (
    <div className={style.recommended_list}>
      {recoMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

async function AllMovies() {
  await delay(1000);

  const response = await fetch("http://localhost:12345/movie", {
    cache: "force-cache",
  });

  if (!response.ok) {
    return <div>영화 목록을 불러오지 못했습니다.</div>;
  }

  const allMovies: MovieData[] = await response.json();

  return (
    <div className={style.movie_list}>
      {allMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className={style.container}>
      <section className={style.section}>
        <h3>지금 추천하는 영화</h3>
        <Suspense
          fallback={
            <div className={style.recommended_list}>
              <MovieListSkeleton count={3} />
            </div>
          }
        >
          <RecoMovies />
        </Suspense>
      </section>

      <section className={style.section}>
        <h3>모든 영화</h3>
        <Suspense
          fallback={
            <div className={style.movie_list}>
              <MovieListSkeleton count={10} />
            </div>
          }
        >
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
