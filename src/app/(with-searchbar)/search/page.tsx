import { Suspense } from "react";
import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import type { MovieData } from "@/types";
import { delay } from "@/util/delay";

async function SearchResult({ keyword }: { keyword: string }) {
  await delay(1200);

  const url = `http://localhost:12345/movie${
    keyword ? `/search?q=${encodeURIComponent(keyword)}` : ""
  }`;

  const response = await fetch(url, {
    cache: "force-cache",
  });

  if (!response.ok) {
    return <div className={style.empty}>검색 결과를 불러오지 못했습니다.</div>;
  }

  const movies: MovieData[] = await response.json();

  return (
    <>
      <p className={style.summary}>
        {keyword ? `${keyword}` : "전체"} 기준 {movies.length}개의 영화를 찾았어요
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
    </>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const keyword = q?.trim() || "";

  return (
    <div className={style.container}>
      <section className={style.section}>
        <h3>검색 결과</h3>
        <Suspense
          key={keyword}
          fallback={
            <>
              <p className={style.summary}>검색 결과를 불러오는 중입니다...</p>
              <div className={style.movie_list}>
                <MovieListSkeleton count={10} />
              </div>
            </>
          }
        >
          <SearchResult keyword={keyword} />
        </Suspense>
      </section>
    </div>
  );
}
