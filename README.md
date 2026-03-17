# 한입 챌린지 8기

**Next.js 한입 챌린지 8기를 이수하며 학습한 실습 레포지토리입니다.**

- 강의: https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%ED%81%AC%EA%B8%B0-nextjs/dashboard?cid=333250
- 챌린지: https://www.inflearn.com/challenge/%ED%95%9C%EC%9E%85-%EC%B1%8C%EB%A6%B0%EC%A7%80-8%EA%B8%B0-nextjs/dashboard?cid=340709
- 학습 형태: 4주 완강 챌린지 + 미션 기반 실습

## 학습 목표

- 렌더링 전략(SSR/SSG/ISR)을 요구사항에 맞게 선택하고 적용
- App Router 환경의 캐시 계층을 이해하고 성능/신선도 균형 설계
- Page Router ↔ App Router 전환 시 구조 차이를 설명하고 구현 가능
- 배포까지 고려한 SEO/메타데이터/최적화 흐름 구성

## 커리큘럼 기반 학습 항목

공개 커리큘럼 기준(66강, 15시간 33분)으로 아래 영역을 실습 중심으로 학습했습니다.

1. Next.js 소개 및 사전 렌더링
2. Page Router 핵심
3. SSR / SSG / ISR
4. App Router 시작
5. Data Fetching
6. Data Cache & Request Memoization
7. 페이지 캐싱(Full Route Cache, Client Router Cache)
8. Route Segment Config 기반 캐시 제어
9. Streaming (`loading.tsx`, `Suspense`)
10. 에러 처리 (`error.tsx`, `not-found.tsx`)
11. Server Action
12. 고급 라우팅(Parallel / Intercepting Routes)
13. 최적화 및 배포

## 핵심 기술 역량

### Page Router

- **데이터 페칭 구조**: `getServerSideProps`, `getStaticProps`, `getStaticPaths` 중심의 페이지 단위 패턴 이해
- **렌더링 전략 적용**: SSR/SSG/ISR을 페이지 목적에 맞게 분리하고 `revalidate`로 갱신 정책 설계
- **강점 해석**: 명시적이고 예측 가능한 구조로 레거시 유지보수, 빠른 온보딩, 안정적 운영에 유리

### App Router

- **서버 컴포넌트 기반 설계**: 필요한 컴포넌트에서 직접 `fetch`하여 데이터 책임을 UI 단위로 분리
- **캐시 계층 제어**: Data Cache, Request Memoization, Full Route Cache, Client Router Cache를 목적별로 적용
- **라우트 단위 UX 최적화**: `loading.tsx`/`Suspense` 스트리밍, `error.tsx`/`not-found.tsx` 복구 흐름 구성
- **강점 해석**: 성능 최적화, 확장성, 최신 Next.js 실무 패턴 대응에 유리

### 선택 기준 (Page vs App)

- **Page Router 적합 상황**: 기존 서비스 유지보수, 빠른 안정화, 페이지 단위 데이터 흐름이 중요한 경우
- **App Router 적합 상황**: 서버 중심 렌더링, 정교한 캐시 전략, 복잡한 레이아웃/라우팅이 필요한 경우

## 미션 기반 실습 이력

- 한입 북스 (Page Router)
- 한입 북스 (App Router)
- 한입 시네마 (Page Router)
- 한입 시네마 (App Router)

동일 도메인을 서로 다른 라우터 체계로 구현하면서,
렌더링 방식·캐싱·데이터 페칭 위치의 차이를 비교 학습했습니다.

## 성과

- **렌더링/캐싱 의사결정 근거를 설명**할 수 있습니다.
- 성능(응답 속도)과 최신성(데이터 신선도) 사이 트레이드오프를 설계할 수 있습니다.
- Page Router와 App Router 모두 경험하여 레거시/신규 코드베이스 적응력이 있습니다.
- 구현, 최적화, 배포 고려사항까지 포함한 엔드투엔드 학습을 완료했습니다.

## 저장소 브랜치

- `main`: 현재 학습 결과 정리 및 통합 브랜치
- `page-router`: Pages Router 기반 구현
- `app-router`: App Router 기반 구현
