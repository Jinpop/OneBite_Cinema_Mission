# Onebite Cinema (App Router)

한입 챌린지 미션 기반으로 구현한 Next.js App Router 프로젝트입니다.  
영화 목록/검색/상세 페이지에 더해, 스트리밍(Suspense), 리뷰 서버 액션, 병렬 라우팅 인터셉팅 모달까지 반영했습니다.

## 구현 범위

- Home (`/`)
  - 추천 영화 + 전체 영화 섹션
  - 섹션별 Suspense 스트리밍 적용
- Search (`/search?q=...`)
  - 검색 결과 렌더링
  - 검색어 변경 시 스트리밍 재트리거
- Movie (`/movie/[id]`)
  - 영화 상세 정보 렌더링
  - 리뷰 조회/작성/삭제 기능

## 주요 기술 포인트

1. 스트리밍(Suspense)
- Home: 추천/전체 섹션을 각각 async 컴포넌트로 분리
- Search: `Suspense key={keyword}`로 새 검색 시 fallback 재노출

2. 서버 액션 리뷰 기능
- 조회: `GET /review/movie/:movieId`
- 작성: `POST /review` (Server Action)
- 삭제: `DELETE /review/:reviewId` (Server Action)
- 작성/삭제 후 `revalidateTag('review-{movieId}')`로 즉시 반영

3. 캐시/렌더링 전략
- Home: 정적 기반 + 재검증
- Search: Dynamic 라우트 렌더링
- Movie Detail: `generateStaticParams` 기반 SSG
- Review List: fetch tag 캐시 무효화

4. 병렬 라우팅 + 인터셉팅 모달
- `@modal` 슬롯 + `(.)movie/[id]` 구성
- CSR 이동: 상세 페이지 모달 오픈
- 직접 URL 접근/새로고침: 전체 페이지 렌더링

## 디렉토리 구조

```bash
src
├─ app
│  ├─ (with-searchbar)
│  │  ├─ page.tsx
│  │  └─ search/page.tsx
│  ├─ @modal
│  │  ├─ default.tsx
│  │  └─ (.)movie/[id]/page.tsx
│  ├─ movie/[id]/page.tsx
│  └─ layout.tsx
├─ actions
│  ├─ create-review.action.ts
│  └─ delete-review.action.ts
├─ components
│  ├─ modal.tsx
│  ├─ review-editor.tsx
│  ├─ review-item.tsx
│  └─ ...
├─ util/delay.ts
└─ types.ts
```

## 실행 방법

1. 백엔드 서버 실행 (`http://localhost:12345`)
2. 프론트 실행

```bash
npm install
npm run dev
```

브라우저: `http://localhost:3000`

## 스크립트

```bash
npm run dev
npm run build
npm run start
```

## 참고

- 빌드 시 `<img>` 사용에 대한 Next.js 권장 경고가 표시될 수 있습니다.
