# youtube-video-resolver-server

크롬 확장프로그램에서 수집한 `videoId[]`를 받아, **YouTube Data API v3**로부터 `channelName`, `channelId`, `title`을 조회하고, **Redis 캐시 + 동일 요청 dedupe + 배치 조회 + rate limit**로 보호하는 Node.js 서버입니다.

이 저장소는 **Codex가 바로 수정하기 쉬운 구조**를 목표로 작성했습니다.

---

## 1. 이 서버가 해결하는 문제

사용자 확장프로그램이 Shorts / 동영상 썸네일을 훑을 때, 같은 `videoId`가 매우 자주 반복됩니다.

그대로 YouTube Data API로 보내면 다음 문제가 생깁니다.

- 같은 `videoId`를 여러 번 중복 조회함
- 여러 사용자가 동시에 같은 `videoId`를 요청할 수 있음
- 스크롤 이벤트 때문에 짧은 시간에 요청이 몰릴 수 있음
- API key를 프론트에 넣으면 노출됨

이 서버는 아래 순서로 이 문제를 해결합니다.

1. 확장프로그램은 **API key 없이** 내 서버에 `videoId[]`만 보냄
2. 서버는 먼저 **Redis 캐시**를 확인함
3. 캐시에 없으면 **진행 중 요청 dedupe**를 확인함
4. 정말 처음 보는 `videoId`만 **YouTube Data API**로 배치 조회함
5. 응답을 Redis에 저장한 뒤 클라이언트에 반환함

---

## 2. 핵심 설계

### A. Redis 캐시

이미 한 번 조회한 `videoId`는 Redis에 저장합니다.

예:

- key: `ytrs:video:dQw4w9WgXcQ`
- value:

```json
{
  "videoId": "dQw4w9WgXcQ",
  "channelId": "UCuAXFkgsw1L7xaCfnd5JJOw",
  "channelName": "RickAstleyVEVO",
  "title": "Rick Astley - Never Gonna Give You Up (Official Music Video)",
  "fetchedAt": "2026-04-17T00:00:00.000Z"
}
```

이후 동일 `videoId` 요청이 오면 YouTube API를 다시 호출하지 않고 캐시된 값을 바로 응답합니다.

### B. In-flight dedupe

Redis만 있으면 충분하지 않습니다.

예를 들어 아래와 같은 상황이 가능합니다.

1. 사용자 A가 `abc123` 요청
2. Redis에는 아직 `abc123` 없음
3. 서버가 YouTube API 호출 시작
4. 응답이 오기 전에 사용자 B도 `abc123` 요청

이때 Redis에는 아직 저장 전이므로, 그대로 두면 YouTube API가 2번 호출됩니다.

그래서 서버 메모리에 `pendingByVideoId: Map<string, Promise>`를 두고,
**같은 `videoId`가 이미 조회 중이면 기존 Promise를 기다리도록** 만들었습니다.

### C. Batch fetch

YouTube `videos.list`는 `id`에 **comma-separated list**를 넣어 여러 video resource를 조회할 수 있고, `part=id,snippet`처럼 필요한 데이터만 요청할 수 있습니다. 또한 `videos.list`의 quota cost는 **1 unit**입니다. citeturn916704view2turn272282search3

이 서버는 miss가 난 `videoId`들을 묶어서 한 번에 조회합니다.

### D. Rate limit

공개 API 서버는 rate limit가 반드시 필요합니다.

이 프로젝트는:

- 전역 limiter
- `/api/v1/videos/resolve` 전용 limiter

두 레이어를 둡니다.

`express-rate-limit`은 반복적인 API 호출을 제한하는 Express 미들웨어입니다. 프록시/로드밸런서 뒤에 있을 때는 `trust proxy` 설정도 함께 맞춰야 합니다. citeturn272282search2turn272282search20

---

## 3. 디렉터리 구조

```txt
youtube-video-resolver-server/
├─ .env.example
├─ package.json
├─ README.md
├─ scripts/
│  └─ smoke.js
└─ src/
   ├─ app.js
   ├─ index.js
   ├─ config/
   │  ├─ env.js
   │  └─ logger.js
   ├─ lib/
   │  ├─ redis.js
   │  └─ youtubeApi.js
   ├─ middleware/
   │  ├─ errorHandler.js
   │  ├─ notFound.js
   │  └─ rateLimiters.js
   ├─ modules/
   │  ├─ health/
   │  │  └─ health.controller.js
   │  └─ resolve/
   │     └─ resolve.controller.js
   ├─ services/
   │  ├─ videoCacheService.js
   │  └─ videoResolveService.js
   └─ utils/
      ├─ chunkArray.js
      └─ normalizeVideoIds.js
```

### 구조 의도

- `modules/`: 라우트 진입점
- `services/`: 실제 비즈니스 로직
- `lib/`: 외부 시스템 연동 (Redis, YouTube API)
- `middleware/`: 공통 Express 처리
- `utils/`: 순수 함수
- `config/`: 환경변수, 로거

Codex가 수정할 때는 보통 아래 원칙으로 건드리면 됩니다.

- API 계약 수정 → `modules/resolve/resolve.controller.js`
- Redis 저장 방식 수정 → `services/videoCacheService.js`
- YouTube 호출 방식 수정 → `lib/youtubeApi.js`
- 중복 요청 처리 수정 → `services/videoResolveService.js`
- 운영 설정 수정 → `.env`, `src/config/env.js`

---

## 4. 설치

### 요구사항

- Node.js 20+
- Redis

### 설치 순서

```bash
npm install
cp .env.example .env
```

`.env`에서 최소한 아래 값은 바꿔야 합니다.

```env
YOUTUBE_API_KEY=replace_me
REDIS_URL=redis://127.0.0.1:6379
```

---

## 5. 실행

개발 모드:

```bash
npm run dev
```

일반 실행:

```bash
npm start
```

헬스체크:

```bash
GET /healthz
```

---

## 6. API 명세

### POST `/api/v1/videos/resolve`

#### 요청

```json
{
  "videoIds": ["dQw4w9WgXcQ", "abc123", "abc123"]
}
```

서버는 내부에서 중복 제거를 하므로 같은 값이 여러 번 와도 첫 번째만 사용합니다.

#### 성공 응답 예시

```json
{
  "ok": true,
  "requested": ["dQw4w9WgXcQ", "abc123"],
  "found": [
    {
      "videoId": "dQw4w9WgXcQ",
      "channelId": "UCuAXFkgsw1L7xaCfnd5JJOw",
      "channelName": "RickAstleyVEVO",
      "title": "Rick Astley - Never Gonna Give You Up (Official Music Video)",
      "fetchedAt": "2026-04-17T00:00:00.000Z"
    }
  ],
  "missing": ["abc123"],
  "cached": [],
  "fetched": ["dQw4w9WgXcQ"]
}
```

#### 필드 의미

- `requested`: 정규화 후 실제 처리한 videoId 목록
- `found`: 실제로 찾은 결과
- `missing`: YouTube에서 찾지 못한 ID
- `cached`: Redis에서 바로 응답한 ID
- `fetched`: 이번 요청 중 YouTube API에서 새로 가져온 ID

---

## 7. 확장프로그램에서 붙이는 예시

```js
async function resolveVideoIds(videoIds) {
  const response = await fetch('https://your-server.example.com/api/v1/videos/resolve', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ videoIds })
  });

  if (!response.ok) {
    throw new Error(`Resolve failed: ${response.status}`);
  }

  return response.json();
}
```

확장프로그램 쪽에서는 아래 최적화를 같이 넣는 것이 좋습니다.

- 스크롤 이벤트 직접 요청 금지
- debounce 적용
- `Set`으로 중복 제거
- 로컬 메모리 캐시 / IndexedDB 캐시 사용
- 짧은 시간 동안 수집한 `videoId`를 한 번에 전송

---

## 8. 운영 환경에서 권장하는 추가 확장

### 1) Negative cache

지금 버전은 `missing` 결과를 Redis에 저장하지 않습니다.

같은 잘못된 `videoId`가 반복해서 들어오는 경우까지 최적화하려면:

- `notfound:${videoId}` 키를 짧은 TTL로 저장
- 이후 같은 잘못된 ID는 YouTube로 보내지 않음

### 2) Redis 기반 rate limit

현재 예제는 `express-rate-limit` 기본 저장소를 사용합니다.
단일 서버에는 충분하지만, 서버가 여러 대면 Redis-backed limiter로 확장하는 것이 좋습니다.

### 3) 인증

지금 예제는 공개 API입니다.
운영 환경에서는 다음 중 하나를 추가하는 편이 좋습니다.

- extension shared token
- HMAC 서명
- 사용자별 API key
- Cloudflare / WAF 제한

### 4) Observability

운영 환경에서는 아래를 추가하는 것이 좋습니다.

- Prometheus metrics
- request ID
- cache hit ratio
- upstream YouTube latency
- resolve success/miss ratio

---

## 9. Codex 작업 지침

Codex에게 아래처럼 지시하면 이어서 작업하기 쉽습니다.

### 예시 1: negative cache 추가

```txt
Add negative caching for missing videoIds.
Store missing IDs in Redis with a short TTL.
Do not call YouTube again while the negative cache entry exists.
Update README accordingly.
```

### 예시 2: channelName만 반환하도록 축소

```txt
Change the resolve API so the response only returns videoId and channelName.
Keep Redis cache structure minimal.
Update validation, service logic, and README examples.
```

### 예시 3: Redis 기반 rate limiter로 확장

```txt
Replace the in-memory express-rate-limit store with a Redis-backed store.
Keep the same route contract.
Document the new environment variables in README and .env.example.
```

### 예시 4: extension 인증 헤더 추가

```txt
Require x-extension-token on POST /api/v1/videos/resolve.
Validate it against EXTENSION_SHARED_TOKEN from environment variables.
Return 401 on mismatch.
Document the header in README.
```

---

## 10. 구현상 중요한 판단 기준

### 왜 Redis와 in-flight dedupe를 둘 다 쓰는가

둘은 역할이 다릅니다.

- Redis: **이미 끝난 결과 재사용**
- in-flight dedupe: **아직 끝나지 않은 동일 요청 합치기**

둘 중 하나만 있으면 중복 요청이 완전히 해결되지 않습니다.

### 왜 서비스 레이어를 분리했는가

Codex가 수정할 때 가장 위험한 부분은 “한 파일에 모든 로직이 섞여 있는 경우”입니다.

지금 구조는:

- controller: 요청/응답 계약
- service: 흐름 제어
- lib: 외부 API / Redis

로 나뉘어 있어서, 수정 범위를 좁히기 쉽습니다.

### 왜 normalize 단계를 넣었는가

확장프로그램에서 빠르게 스크롤하면 같은 ID가 반복해서 모일 수 있습니다.
서버 입구에서 정규화하면 이후 로직이 단순해집니다.

---

## 11. 참고한 공식 문서

- YouTube Data API `videos.list`는 `part`와 `id`를 사용해 video resource를 조회할 수 있고, `id`는 comma-separated list를 받습니다. `snippet.channelId`, `snippet.title` 같은 필드를 포함합니다. 또한 `videos.list`의 quota cost는 1 unit입니다. citeturn916704view2turn916704view1
- `ioredis`는 Node.js용 Redis client입니다. citeturn272282search1turn272282search7
- `express-rate-limit`은 Express용 rate limiting 미들웨어입니다. 프록시 환경에서는 관련 설정 주의가 필요합니다. citeturn272282search2turn272282search20

---

## 12. 바로 다음에 붙일 작업 추천 순서

1. 확장프로그램에서 `videoIds` 배치 전송 연결
2. 서버 응답을 `videoId -> channelName` 맵으로 변환
3. IndexedDB 로컬 캐시 추가
4. negative cache 추가
5. Redis-backed limiter 추가
6. extension 인증 추가


---

## 13. Security Hardening (Applied)

The server now expects an extension token header on resolve requests.

- Header: `x-extension-token`
- Route: `POST /api/v1/videos/resolve`
- On mismatch or missing token: `401 UNAUTHORIZED_EXTENSION`

### Backend env

Set these values in `backend/.env`:

```env
CORS_ORIGIN=https://www.youtube.com,chrome-extension://your-extension-id
EXTENSION_SHARED_TOKEN=generate_a_unique_64_plus_character_random_token
```

### Frontend env

Set these values in `frontend/.env` (development) and `frontend/.env.production` (production):

```env
VITE_RESOLVER_API_BASE_URL=https://your-resolver.example.com
VITE_EXTENSION_TOKEN=the_exact_same_random_token_as_backend
```

`VITE_EXTENSION_TOKEN` must exactly match `EXTENSION_SHARED_TOKEN`.
