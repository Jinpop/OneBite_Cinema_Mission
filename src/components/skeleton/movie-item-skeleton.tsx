import style from "./movie-item-skeleton.module.css";

export default function MovieItemSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.poster}></div>
      <div className={style.title}></div>
      <div className={style.meta}></div>
      <div className={style.metaShort}></div>
    </div>
  );
}
