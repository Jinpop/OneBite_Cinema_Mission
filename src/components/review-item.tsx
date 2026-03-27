import type { ReviewData } from "@/types";
import style from "./review-item.module.css";
import ReviewItemDeleteButton from "./review-item-delete-button";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom}>
        <div>{new Date(createdAt).toLocaleString()}</div>
        <div className={style.delete_button}>
          <ReviewItemDeleteButton reviewId={id} movieId={movieId} />
        </div>
      </div>
    </div>
  );
}
