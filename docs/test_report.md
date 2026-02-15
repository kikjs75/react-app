# 테스트 결과 보고서

- **실행일시**: 2026-02-16
- **테스트 프레임워크**: Vitest v4.0.18
- **환경**: jsdom
- **브랜치**: typescript-migration

## 실행 결과 요약

| 항목 | 결과 |
|------|------|
| 테스트 파일 | **3 passed** (3) |
| 테스트 케이스 | **11 passed** (11) |
| 총 소요 시간 | 33.96s |
| transform | 690ms |
| setup | 3.35s |
| import | 5.07s |
| tests | 2.44s |
| environment | 19.58s |

## 테스트 환경 구성

### 설치 패키지

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `vitest` | ^4.0.18 | 테스트 러너 |
| `@testing-library/react` | ^16.3.2 | React 컴포넌트 렌더링/쿼리 |
| `@testing-library/jest-dom` | ^6.9.1 | DOM 매처 확장 (toBeInTheDocument 등) |
| `@testing-library/user-event` | ^14.6.1 | 사용자 인터랙션 시뮬레이션 |
| `jsdom` | ^28.1.0 | 브라우저 환경 에뮬레이션 |

### 설정 파일

**vite.config.ts** — Vitest 설정 통합
```ts
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: './src/test/setup.ts',
}
```

**src/test/setup.ts** — jest-dom 매처 등록
```ts
import '@testing-library/jest-dom/vitest';
```

**package.json** — 테스트 스크립트
```json
"test": "vitest run"
```

---

## 컴포넌트별 테스트 상세

### 1. Button (`src/components/Button/Button.test.tsx`)

| # | 테스트 케이스 | 결과 | 검증 내용 |
|---|--------------|------|-----------|
| 1 | renders children | PASS | `<Button>클릭</Button>` 렌더링 시 "클릭" 텍스트가 버튼 요소에 표시되는지 확인 |
| 2 | applies variant and size classes | PASS | `variant="danger"`, `size="lg"` 전달 시 `btn btn-danger btn-lg` 클래스가 적용되는지 확인 |
| 3 | applies default classes when no props given | PASS | props 없이 렌더링 시 기본값 `btn btn-primary btn-md` 클래스가 적용되는지 확인 |
| 4 | passes extra props to the button element | PASS | `disabled` prop 전달 시 버튼이 비활성화되는지 확인 |

**테스트 관점**: 렌더링, CSS 클래스 조합, 기본값, HTML 속성 전달

---

### 2. ContactForm (`src/components/ContactForm/ContactForm.test.tsx`)

| # | 테스트 케이스 | 결과 | 소요 시간 | 검증 내용 |
|---|--------------|------|-----------|-----------|
| 1 | renders name and phone inputs | PASS | - | `이름`, `전화번호` 라벨에 연결된 입력 필드가 렌더링되는지 확인 |
| 2 | calls onSubmit with contact data | PASS | 998ms | 이름 "홍길동", 전화번호 "010-1234-5678" 입력 후 등록 클릭 시 `onSubmit`이 올바른 데이터로 호출되는지 확인 |
| 3 | does not submit when fields are empty | PASS | - | 빈 입력 상태에서 등록 클릭 시 `onSubmit`이 호출되지 않는지 확인 |
| 4 | clears inputs after submit | PASS | 390ms | 제출 후 이름/전화번호 입력 필드가 빈 문자열로 초기화되는지 확인 |

**테스트 관점**: 폼 렌더링, 데이터 제출, 빈 값 방어(유효성 검증), 제출 후 초기화

**사용 기법**:
- `vi.fn()` — onSubmit 콜백 모킹
- `userEvent.setup()` — 실제 사용자 입력 시뮬레이션 (type, click)
- `expect.objectContaining()` — id 필드(Date.now())를 제외한 부분 매칭

---

### 3. ContactList (`src/components/ContactList/ContactList.test.tsx`)

| # | 테스트 케이스 | 결과 | 검증 내용 |
|---|--------------|------|-----------|
| 1 | shows empty message when no contacts | PASS | 빈 배열 전달 시 "등록된 연락처가 없습니다." 메시지가 표시되는지 확인 |
| 2 | renders contacts in a table | PASS | 2개의 연락처 전달 시 이름과 전화번호가 모두 테이블에 렌더링되는지 확인 |
| 3 | does not show empty message when contacts exist | PASS | 연락처가 있을 때 빈 목록 메시지가 표시되지 않는지 확인 |

**테스트 관점**: 빈 상태 UI, 데이터 렌더링, 조건부 렌더링

**테스트 데이터**:
```ts
[
  { id: 1, name: '홍길동', phone: '010-1234-5678' },
  { id: 2, name: '김철수', phone: '010-9876-5432' },
]
```

---

## 테스트 커버리지 범위

| 컴포넌트 | 렌더링 | Props | 이벤트 | 상태 변화 | 조건부 렌더링 |
|----------|--------|-------|--------|-----------|---------------|
| Button | O | O | - | - | - |
| ContactForm | O | O | O | O | - |
| ContactList | O | O | - | - | O |

## 실행 방법

```bash
# 전체 테스트 실행
npm test

# 감시 모드 (파일 변경 시 자동 재실행)
npx vitest

# 특정 파일만 실행
npx vitest run src/components/Button/Button.test.tsx
```
