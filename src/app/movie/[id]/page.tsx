import { notFound } from "next/navigation";
import style from "./page.module.css";
import type { MovieData, ReviewData } from "@/types";
import ReviewEditor from "@/components/review-editor";
import ReviewItem from "@/components/review-item";

export const dynamicParams = false;

async function fetchAllMovies(): Promise<MovieData[]> {
  const response = await fetch("http://localhost:12345/movie", {
    cache: "force-cache",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export async function generateStaticParams() {
  const movies = await fetchAllMovies();

  return movies.map((movie) => ({
    id: String(movie.id),
  }));
}

async function fetchMovieById(id: number): Promise<MovieData | null> {
  const response = await fetch(`http://localhost:12345/movie/${id}`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function fetchMovieReviews(movieId: number): Promise<ReviewData[]> {
  const response = await fetch(`http://localhost:12345/review/movie/${movieId}`, {
    next: { tags: [`review-${movieId}`] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.statusText}`);
  }

  return response.json();
}

async function ReviewList({ movieId }: { movieId: number }) {
  const reviews = await fetchMovieReviews(movieId);

  if (reviews.length === 0) {
    return <p className={style.review_empty}>아직 등록된 리뷰가 없습니다.</p>;
  }

  return (
    <div className={style.review_list}>
      {reviews.map((review) => (
        <ReviewItem key={`review-${review.id}`} {...review} />
      ))}
    </div>
  );
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

      <section className={style.review_editor_section}>
        <h2>리뷰 작성</h2>
        <ReviewEditor movieId={movie.id} />
      </section>

      <section className={style.review_list_section}>
        <h2>리뷰 목록</h2>
        <ReviewList movieId={movie.id} />
      </section>
    </div>
  );
}
