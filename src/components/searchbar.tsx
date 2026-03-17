"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./searchbar.module.css";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("q") || "";

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onSubmit = () => {
    const trimmed = search.trim();

    if (!trimmed) {
      router.push("/search");
      return;
    }
    if (trimmed === q) return;

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className={style.container}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
        placeholder="영화 제목을 입력하세요"
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
