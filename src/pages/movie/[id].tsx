import movies from "@/mock/dummy.json";
import style from "./[id].module.css";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const parsedId = Number(router.query.id);

  const movie = movies.find((item) => item.id === parsedId) ?? movies[0];

  const { title, subTitle, releaseDate, runtime, company, genres, description } =
    movie;

  return (
    <div className={style.container}>
      <section
        className={style.poster_container}
        style={{ backgroundImage: `url('${movie.posterImgUrl}')` }}
      >
        <img src={movie.posterImgUrl} alt={`${title} poster`} />
      </section>

      <section className={style.info_section}>
        <h1>{title}</h1>
        <p className={style.original}>{subTitle}</p>
        <div className={style.meta}>
          <span>{releaseDate}</span>
          <span>{runtime}분</span>
          <span>{company}</span>
          <span>{genres.join(" / ")}</span>
        </div>
        <p className={style.overview}>{description}</p>
      </section>
    </div>
  );
}
