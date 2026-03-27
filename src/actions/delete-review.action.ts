"use server";

import { revalidateTag } from "next/cache";
import type { ReviewActionState } from "./create-review.action";

const API_BASE_URL = "http://localhost:12345";

export async function deleteReviewAction(
  _: ReviewActionState | null,
  formData: FormData
): Promise<ReviewActionState> {
  const reviewId = formData.get("reviewId")?.toString();
  const movieId = formData.get("movieId")?.toString();

  if (!reviewId || !movieId) {
    return {
      status: false,
      error: "삭제할 리뷰 정보가 올바르지 않습니다.",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/review/${reviewId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${movieId}`);

    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다: ${error}`,
    };
  }
}
