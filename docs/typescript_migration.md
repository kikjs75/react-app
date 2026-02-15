# TypeScript Migration Guide

`javascript-migration` 브랜치의 JavaScript/JSX 코드를 TypeScript/TSX로 마이그레이션한 작업 기록입니다.

## 1. 사전 준비: 의존성 설치

다음 패키지를 devDependencies로 추가했습니다.

```bash
npm install -D typescript @types/react @types/react-dom typescript-eslint
```

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `typescript` | ^5.9.3 | TypeScript 컴파일러 |
| `@types/react` | ^19.2.14 | React 타입 정의 |
| `@types/react-dom` | ^19.2.3 | ReactDOM 타입 정의 |
| `typescript-eslint` | ^8.55.0 | ESLint TypeScript 지원 |

## 2. tsconfig 파일 생성

master 브랜치를 참고하여 3개의 설정 파일을 생성했습니다.

### tsconfig.json (루트)

프로젝트 레퍼런스 방식으로 app과 node 설정을 분리합니다.

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### tsconfig.app.json (src 코드용)

- `target`: ES2022
- `jsx`: react-jsx
- `strict`: true
- `moduleResolution`: bundler
- `verbatimModuleSyntax`: true (type-only import 강제)

### tsconfig.node.json (vite 설정용)

- `target`: ES2023
- `include`: `["vite.config.ts"]`

## 3. 파일 변환

`git mv`로 파일 이름을 변경하여 git 히스토리를 보존했습니다.

### 3.1 `src/types.js` → `src/types.ts`

JSDoc `@typedef`를 TypeScript `interface`로 변환했습니다.

**Before:**
```js
/**
 * @typedef {Object} Contact
 * @property {number} id
 * @property {string} name
 * @property {string} phone
 */

export {};
```

**After:**
```ts
export interface Contact {
  id: number;
  name: string;
  phone: string;
}
```

### 3.2 `src/main.jsx` → `src/main.tsx`

- import 경로를 `.jsx` → `.tsx`로 변경
- `document.getElementById('root')`에 non-null assertion(`!`) 추가

```ts
createRoot(document.getElementById('root')!).render(...)
```

### 3.3 `src/App.jsx` → `src/App.tsx`

- `Contact` 타입을 type-only import
- `useState`에 제네릭 타입 명시: `useState<Contact[]>([])`
- 함수 매개변수에 타입 추가: `contact: Contact`

```ts
import type { Contact } from "./types";

const [contacts, setContacts] = useState<Contact[]>([]);

function handleAddContact(contact: Contact) { ... }
```

### 3.4 `src/components/Button/Button.jsx` → `Button.tsx`

- `Variant`, `Size` 유니언 타입 정의
- `ButtonProps` interface 생성 (`ButtonHTMLAttributes` 확장)
- 함수 시그니처에 타입 적용

```ts
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
}

export default function Button({ variant, size, className, children, ...rest }: ButtonProps) { ... }
```

### 3.5 `src/components/ContactForm/ContactForm.jsx` → `ContactForm.tsx`

- `ContactFormProps` interface 생성
- `FormEvent` 타입을 type-only import
- `handleSubmit` 매개변수에 `FormEvent` 타입 적용

```ts
import type { FormEvent } from "react";
import type { Contact } from "../../types";

interface ContactFormProps {
  onSubmit: (contact: Contact) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) { ... }
```

### 3.6 `src/components/ContactList/ContactList.jsx` → `ContactList.tsx`

- `ContactListProps` interface 생성

```ts
import type { Contact } from "../../types";

interface ContactListProps {
  contacts: Contact[];
}

export default function ContactList({ contacts }: ContactListProps) { ... }
```

### 3.7 index 파일 및 vite 설정

확장자만 변경하고 내용은 동일합니다.

| 원본 | 변환 |
|------|------|
| `src/components/Button/index.js` | `index.ts` |
| `src/components/ContactForm/index.js` | `index.ts` |
| `src/components/ContactList/index.js` | `index.ts` |
| `vite.config.js` | `vite.config.ts` |

## 4. 설정 파일 업데이트

### index.html

```html
<!-- Before -->
<script type="module" src="/src/main.jsx"></script>

<!-- After -->
<script type="module" src="/src/main.tsx"></script>
```

### eslint.config.js

- 파일 패턴: `**/*.{js,jsx}` → `**/*.{ts,tsx}`
- `typescript-eslint` 플러그인 추가
- `no-unused-vars` 커스텀 규칙 제거 (tseslint.configs.recommended가 처리)

### package.json

```json
// Before
"build": "vite build"

// After
"build": "tsc -b && vite build"
```

## 5. 검증 결과

```bash
# 타입 체크 — 에러 없음
npx tsc --noEmit

# 빌드 — 성공
npm run build
# ✓ 39 modules transformed
# dist/index.html                   0.46 kB
# dist/assets/index-BaGdZJU-.css    3.06 kB
# dist/assets/index-DCeLJszn.js   195.19 kB

# 린트 — 에러 없음
npm run lint
```

## 변환 요약

| 카테고리 | 변경 사항 |
|----------|-----------|
| 새 파일 | `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` |
| JS → TS | `types.ts`, 3개 `index.ts`, `vite.config.ts` |
| JSX → TSX | `main.tsx`, `App.tsx`, `Button.tsx`, `ContactForm.tsx`, `ContactList.tsx` |
| 설정 수정 | `index.html`, `eslint.config.js`, `package.json` |
| 타입 패턴 | JSDoc `@typedef`/`@param` → `interface`, 인라인 타입 어노테이션, `type`-only import |
