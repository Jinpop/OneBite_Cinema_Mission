import { notFound } from "next/navigation";
import style from "./page.module.css";
import type { MovieData } from "@/types";

export const dynamicParams = false;

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

export async function generateStaticParams() {
  const movies = await fetchAllMovies();

  return movies.map((movie) => ({
    id: String(movie.id),
  }));
}

async function fetchMovieById(id: number): Promise<MovieData | null> {
  try {
    const response = await fetch(`http://localhost:12345/movie/${id}`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await fetchMovieById(Number(id));

  if (!movie) {
    notFound();
  }

  const {
    title,
    subTitle,
    releaseDate,
    runtime,
    company,
    genres,
    description,
  } = movie;

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
