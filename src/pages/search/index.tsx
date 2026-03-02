import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import movies from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";

export default function Page() {
  const router = useRouter();
  const q = typeof router.query.q === "string" ? router.query.q.trim() : "";

  const filteredMovies = movies.filter((movie) => {
    if (!q) return true;

    // 영화에 연관된 모든 텍스트 정보를 하나의 문자열로 합쳐서 검색
    const target =
      `${movie.title} ${movie.subTitle} ${movie.description} ${movie.company} ${movie.genres.join(" ")}`.toLowerCase();

    return target.includes(q.toLowerCase());
  });

  return (
    <div className={style.container}>
      <section className={style.section}>
        <h3>검색 결과</h3>
        <p className={style.summary}>
          {q ? `"${q}"` : "전체"} 기준 {filteredMovies.length}개의 영화를
          찾았어요
        </p>
        {filteredMovies.length === 0 ? (
          <div className={style.empty}>검색 결과가 없습니다.</div>
        ) : (
          <div className={style.movie_list}>
            {filteredMovies.map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
