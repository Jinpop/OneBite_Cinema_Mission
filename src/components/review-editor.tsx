"use client";

import { useActionState, useEffect, useRef } from "react";
import { createReviewAction } from "@/actions/create-review.action";
import style from "./review-editor.module.css";

export default function ReviewEditor({ movieId }: { movieId: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  useEffect(() => {
    if (!state) {
      return;
    }

    if (!state.status) {
      alert(state.error);
      return;
    }

    formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} className={style.form} action={formAction}>
      <input hidden name="movieId" value={movieId} readOnly />
      <textarea
        name="content"
        placeholder="이 영화에 대한 리뷰를 작성해보세요"
        required
        disabled={isPending}
      />

      <div className={style.submit_row}>
        <input
          name="author"
          placeholder="작성자"
          required
          disabled={isPending}
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "저장 중..." : "작성하기"}
        </button>
      </div>
    </form>
  );
}
