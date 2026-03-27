"use client";

import { useActionState, useEffect } from "react";
import { deleteReviewAction } from "@/actions/delete-review.action";

export default function ReviewItemDeleteButton({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input hidden name="reviewId" value={reviewId} readOnly />
      <input hidden name="movieId" value={movieId} readOnly />
      <button type="submit" disabled={isPending}>
        {isPending ? "삭제 중..." : "삭제"}
      </button>
    </form>
  );
}
