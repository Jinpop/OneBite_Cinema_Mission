import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import { useRouter } from "next/router";
import fetchMovies from "@/lib/fetch-movies";
import fetchOneMovie from "@/lib/fetch-one-movie";
import Head from "next/head";

export const getStaticPaths = async () => {
  const movies = await fetchMovies();

  return {
    paths: movies.map((movie) => ({
      params: { id: String(movie.id) },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = Number(context.params?.id);
  const movie = await fetchOneMovie(id);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: { movie },
    revalidate: 3600,
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
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
        로딩 중입니다...
      </>
    );
  }

  if (!movie) {
    return "문제가 발생했습니다. 다시 시도해주세요.";
  }

  const {
    title,
    subTitle,
    releaseDate,
    runtime,
    company,
    genres,
    description,
    posterImgUrl,
  } = movie;

  return (
    <>
      <Head>
        <title>{title} | 한입 씨네마</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={posterImgUrl} />
      </Head>

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
    </>
  );
}
