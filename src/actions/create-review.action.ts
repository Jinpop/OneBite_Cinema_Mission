"use server";

import { revalidateTag } from "next/cache";

export interface ReviewActionState {
  status: boolean;
  error: string;
}

const API_BASE_URL = "http://localhost:12345";

export async function createReviewAction(
  _: ReviewActionState | null,
  formData: FormData
): Promise<ReviewActionState> {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString().trim();
  const author = formData.get("author")?.toString().trim();

  if (!movieId || !content || !author) {
    return {
      status: false,
      error: "작성자와 리뷰 내용을 모두 입력해주세요.",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: Number(movieId),
        content,
        author,
      }),
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
      error: `리뷰 저장에 실패했습니다: ${error}`,
    };
  }
}
