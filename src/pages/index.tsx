// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import movies from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";

export default function Home() {
  const recommendedMovies = movies.slice(0, 3);

  return (
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
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
