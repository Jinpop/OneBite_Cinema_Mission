import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import type { MovieData } from "@/types";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allMovies, initialRecoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      initialRecoMovies,
    },
    revalidate: 60,
  };
};

export default function Home({
  allMovies,
  initialRecoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [recommendedMovies, setRecommendedMovies] =
    useState<MovieData[]>(initialRecoMovies);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const nextMovies = await fetchRandomMovies();
      if (nextMovies.length > 0) {
        setRecommendedMovies(nextMovies);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Head>
        <title>한입 씨네마</title>
        <meta property="og:title" content="한입 씨네마" />
        <meta
          property="og:description"
          content="한입 씨네마에 등록된 영화와 리뷰를 만나보세요."
        />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>

      <div className={style.container}>
        <section className={style.section}>
          <h3>지금 추천하는 영화</h3>
          <div className={style.recommended_list}>
            {recommendedMovies.map((movie) => (
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
