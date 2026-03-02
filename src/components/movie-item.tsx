import type { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";

export default function MovieItem({
  id,
  title,
  subTitle,
  genres,
  posterImgUrl,
}: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.container}>
      <div className={style.posterWrap}>
        <img src={posterImgUrl} alt={`${title} poster`} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.meta}>
        <span>{genres[0]}</span>
        <span>{subTitle}</span>
      </div>
    </Link>
  );
}
