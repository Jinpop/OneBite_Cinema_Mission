import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import type { MovieData } from "@/types";
import Head from "next/head";

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const q = typeof router.query.q === "string" ? router.query.q.trim() : "";

  useEffect(() => {
    if (!router.isReady) return;

    const fetchSearchResults = async () => {
      setIsLoading(true);
      const searchedMovies = await fetchMovies(q || undefined);
      setMovies(searchedMovies);
      setIsLoading(false);
    };

    fetchSearchResults();
  }, [q, router.isReady]);

  const hasResult = movies.length > 0;

  return (
    <>
      <Head>
        <title>한입 씨네마 - 검색</title>
        <meta property="og:title" content="한입 씨네마 - 검색" />
        <meta
          property="og:description"
          content="영화 제목으로 한입 씨네마의 영화를 검색해보세요."
        />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>

      <div className={style.container}>
        <section className={style.section}>
          <h3>검색 결과</h3>
          <p className={style.summary}>
            {q ? `"${q}"` : "전체"} 기준 {movies.length}개의 영화를 찾았어요
          </p>

          {isLoading ? (
            <div className={style.empty}>검색 결과를 불러오는 중입니다...</div>
          ) : hasResult ? (
            <div className={style.movie_list}>
              {movies.map((movie) => (
                <MovieItem key={movie.id} {...movie} />
              ))}
            </div>
          ) : (
            <div className={style.empty}>검색 결과가 없습니다.</div>
          )}
        </section>
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
