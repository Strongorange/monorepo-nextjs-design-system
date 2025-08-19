# @strongorange/ds-ui Design System

## 개요

`@strongorange/ds-ui`는 다양한 프로젝트에서 일관된 UI 경험을 제공하기 위해 구축된 재사용 가능한 컴포넌트 라이브러리입니다. 이 디자인 시스템은 Tailwind CSS v4를 기반으로 하며, TypeScript와 React로 구현되어 있습니다.

## 목차

- [기술 스택](#기술-스택)
- [아키텍처 개요](#아키텍처-개요)
- [핵심 구성 요소](#핵심-구성-요소)
  - [스타일 시스템](#스타일-시스템)
  - [컴포넌트 시스템](#컴포넌트-시스템)
  - [유틸리티 시스템](#유틸리티-시스템)
- [빌드 시스템](#빌드-시스템)
- [배포 및 버전 관리](#배포-및-버전-관리)
- [프로젝트 통합 가이드](#프로젝트-통합-가이드)
- [개발 가이드](#개발-가이드)
- [트러블슈팅](#트러블슈팅)
- [확장 및 커스터마이징](#확장-및-커스터마이징)
- [성능 최적화](#성능-최적화)
- [접근성](#접근성)
- [테스팅](#테스팅)
- [API 참조](#api-참조)

## 기술 스택

### 핵심 기술

- **React 18+**: 컴포넌트 라이브러리 기반
- **TypeScript 5+**: 타입 안전성과 개발자 경험 향상
- **Tailwind CSS v4**: 유틸리티 기반 스타일링과 디자인 토큰 시스템
- **tsup**: 빠른 TypeScript 빌드 도구
- **class-variance-authority (CVA)**: 타입 안전한 variant 시스템

### 지원 라이브러리

- **@radix-ui/react-slot**: 컴포넌트 composition을 위한 슬롯 패턴
- **clsx**: 조건부 클래스 네임 유틸리티
- **tailwind-merge**: Tailwind 클래스 충돌 해결

### 빌드 도구

- **PostCSS**: CSS 후처리 및 최적화
- **cssnano**: CSS 압축
- **autoprefixer**: 브라우저 호환성

## 아키텍처 개요

### 레이어드 아키텍처

```
┌─────────────────────────────────────┐
│           Consumer Projects          │  ← toolditor, frontend-a 등
├─────────────────────────────────────┤
│         Component Library           │  ← @strongorange/ds-ui
├─────────────────────────────────────┤
│         Design Token System         │  ← CSS Custom Properties
├─────────────────────────────────────┤
│         Tailwind CSS Foundation     │  ← 유틸리티 클래스 생성
└─────────────────────────────────────┘
```

### 패키지 구조

```
design-system/
├── src/
│   ├── components/ui/          # React 컴포넌트
│   ├── lib/                    # 유틸리티 함수
│   ├── styles.css              # 디자인 토큰 & Tailwind 설정
│   └── index.ts                # 메인 export
├── dist/                       # 빌드 산출물
│   ├── index.js                # CommonJS 번들
│   ├── index.mjs               # ES Module 번들
│   ├── index.d.ts              # TypeScript 선언
│   └── styles.css              # 컴파일된 CSS
├── tailwind.config.js          # Tailwind 설정
├── tailwind.preset.js          # 소비자용 preset
└── package.json
```

## 핵심 구성 요소

### 스타일 시스템

#### 디자인 토큰 (Design Tokens)

디자인 토큰은 Tailwind CSS v4의 `@theme` 지시자를 사용해 정의됩니다:

```css
@theme {
  /* 색상 토큰 */
  --color-ds-primary: #0172fe;
  --color-ds-primary-hover: #0167e5;
  --color-ds-primary-active: #014498;
  --color-ds-primary-foreground: #ffffff;

  /* 타이포그래피 토큰 */
  --radius-ds: 0.5rem;
}
```

#### CSS 레이어 시스템

Tailwind CSS v4의 레이어 시스템을 활용해 스타일 우선순위를 관리합니다:

```css
@layer base {
  :root {
    --ds-primary: var(--color-ds-primary);
    /* ... 다른 토큰들 */
  }

  .dark {
    --ds-primary: #0172fe;
    /* ... 다크 모드 토큰들 */
  }
}
```

#### 우선순위 전략 (Important: true)

글로벌 CSS 리셋과의 충돌을 방지하기 위해 `important: true` 설정을 사용합니다:

```js
// tailwind.config.js
const designSystemConfig = {
  important: true, // 모든 유틸리티에 !important 부여
  theme: {
    extend: {
      colors: {
        primary: "var(--ds-primary)",
        // ...
      },
    },
  },
};
```

**중요**: 이 설정은 소비자 프로젝트의 글로벌 스타일(예: `button { background: none; }`)이 Tailwind 유틸리티를 덮어쓰는 것을 방지합니다.

### 컴포넌트 시스템

#### 컴포넌트 설계 원칙

1. **Composition over Inheritance**: `@radix-ui/react-slot`을 사용한 컴포지션 패턴
2. **Type Safety**: TypeScript와 CVA를 통한 완전한 타입 안전성
3. **Accessibility First**: ARIA 표준과 키보드 네비게이션 지원
4. **Flexibility**: `asChild` prop을 통한 유연한 컴포넌트 구성

#### 컴포넌트 구조 예시 (Button)

```tsx
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  // 기본 클래스
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // ...
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        // ...
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### 유틸리티 시스템

#### cn 함수 (Class Name 유틸리티)

`clsx`와 `tailwind-merge`를 결합한 스마트 클래스 네임 병합:

```tsx
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**역할**:

- 조건부 클래스 네임 처리 (`clsx`)
- Tailwind 클래스 충돌 해결 (`twMerge`)
- 예: `cn("bg-red-500", "bg-blue-500")` → `"bg-blue-500"` (마지막 값 우선)

## 빌드 시스템

### 듀얼 패키지 지원

`tsup`을 사용해 CommonJS와 ES Module을 동시에 지원합니다:

```js
// tsup.config.ts
export default defineConfig({
  entry: ["src/index.ts", "src/styles.css"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
});
```

### CSS 빌드 파이프라인

1. **Tailwind 컴파일**: `src/styles.css` → 유틸리티 클래스 생성
2. **PostCSS 처리**: autoprefixer, cssnano 적용
3. **산출물**: `dist/styles.css` (컴파일된 CSS)

### 패키지 Export 맵

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./styles": "./dist/styles.css",
    "./tailwind.preset": "./tailwind.preset.js"
  }
}
```

## 배포 및 버전 관리

### GitHub Packages 배포

```bash
# 버전 업 및 배포
npm run release:patch   # 0.1.0 → 0.1.1
npm run release:minor   # 0.1.0 → 0.2.0
npm run release:major   # 0.1.0 → 1.0.0
```

### 버전 관리 전략

- **Patch**: 버그 수정, 문서 업데이트
- **Minor**: 새 컴포넌트 추가, 비파괴적 변경
- **Major**: 파괴적 변경, API 변경

## 프로젝트 통합 가이드

### 기본 설정

#### 1. 패키지 설치

```bash
npm install @strongorange/ds-ui
```

#### 2. 스타일 Import

```css
/* CSS 파일에서 */
@import "@strongorange/ds-ui/styles";
```

또는

```tsx
// TypeScript/JavaScript 파일에서
import "@strongorange/ds-ui/styles";
```

#### 3. 컴포넌트 사용

```tsx
import { Button } from "@strongorange/ds-ui";

function App() {
  return (
    <Button variant="default" size="lg">
      클릭하세요
    </Button>
  );
}
```

### 고급 통합 (Tailwind 사용 프로젝트)

소비자 프로젝트에서도 Tailwind를 사용하는 경우:

```js
// tailwind.config.js
module.exports = {
  presets: [require("@strongorange/ds-ui/tailwind.preset")],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false, // 리셋 CSS 충돌 방지
  },
};
```

### 주의사항

#### CSS 우선순위 문제 해결

소비자 프로젝트의 글로벌 스타일이 DS 컴포넌트를 덮어쓰는 경우:

1. **DS 컴포넌트가 정상 작동**: `important: true` 덕분에 DS 스타일이 우선 적용됨
2. **추가 커스터마이징 필요시**: 더 구체적인 선택자나 `!important` 사용

## 개발 가이드

### 로컬 개발 환경

```bash
# 의존성 설치
npm install

# 개발 모드 (watch)
npm run dev

# 빌드
npm run build

# 빌드 테스트
npm run build:test
```

### 새 컴포넌트 추가

1. **컴포넌트 파일 생성**: `src/components/ui/새컴포넌트.tsx`
2. **CVA variants 정의**: 스타일 variants 및 기본값 설정
3. **TypeScript 타입 정의**: Props 인터페이스 및 타입 export
4. **메인 export에 추가**: `src/index.ts`에서 컴포넌트 export
5. **문서화**: 사용 예시 및 API 문서 작성

### 디자인 토큰 추가

1. **토큰 정의**: `src/styles.css`의 `@theme` 블록에 추가
2. **CSS 변수 매핑**: `@layer base`에서 CSS 커스텀 프로퍼티로 노출
3. **Tailwind 설정**: `tailwind.preset.js`에서 Tailwind 유틸리티로 연결
4. **다크 모드 지원**: `.dark` 클래스에서 다크 모드 값 정의

## 트러블슈팅

### 일반적인 문제들

#### 문제: DS 컴포넌트 스타일이 적용되지 않음

**원인**: 소비자 프로젝트의 글로벌 CSS가 DS 스타일을 덮어씀

**해결책**:

1. DS 스타일 import 순서 확인
2. `important: true` 설정 확인
3. 브라우저 개발자 도구에서 CSS 충돌 검사

#### 문제: TypeScript 타입 에러

**원인**: 잘못된 prop 사용 또는 타입 불일치

**해결책**:

1. 컴포넌트 API 문서 확인
2. `ButtonProps` 등 타입 정의 참조
3. IDE auto-complete 활용

#### 문제: 빌드 시 CSS 누락

**원인**: PostCSS 설정 또는 Tailwind 설정 오류

**해결책**:

1. `content` 경로 설정 확인
2. PostCSS 플러그인 순서 확인
3. 빌드 로그에서 에러 메시지 확인

### 디버깅 도구

#### CSS 추출 도구

```bash
# 사용된 CSS 클래스 추출
npm run extract-classes

# 상세 로그와 함께 추출
npm run extract-classes:verbose

# 결과를 파일로 저장
npm run extract-classes:save
```

## 확장 및 커스터마이징

### 컴포넌트 확장

#### 기존 컴포넌트 확장

```tsx
import { Button, ButtonProps } from "@strongorange/ds-ui";

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

export function CustomButton({
  loading,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading ? "Loading..." : children}
    </Button>
  );
}
```

#### 새로운 Variant 추가

```tsx
// 프로젝트별 버튼 확장
const customButtonVariants = cva(
  // DS Button의 기본 클래스 상속
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        // DS variants 유지
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // 새 variant 추가
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      },
    },
  }
);
```

### 테마 커스터마이징

#### 색상 토큰 오버라이드

```css
/* 프로젝트별 CSS 파일 */
@import "@strongorange/ds-ui/styles";

:root {
  --ds-primary: #8b5cf6; /* 보라색으로 변경 */
  --ds-primary-hover: #7c3aed;
}
```

#### 다크 모드 커스터마이징

```css
.dark {
  --ds-primary: #a78bfa;
  --ds-background: #0f0f23;
}
```

## 성능 최적화

### 번들 크기 최적화

1. **Tree Shaking**: 사용하는 컴포넌트만 import
2. **CSS Purging**: 사용되지 않는 CSS 클래스 자동 제거
3. **Code Splitting**: 컴포넌트별 동적 import 지원

```tsx
// Tree shaking 친화적 import
import { Button } from "@strongorange/ds-ui";

// 전체 라이브러리 import (비권장)
import * as DS from "@strongorange/ds-ui";
```

### 런타임 성능

1. **React.memo**: 불필요한 리렌더링 방지
2. **useCallback**: 이벤트 핸들러 메모이제이션
3. **CSS-in-JS 최소화**: 유틸리티 클래스 활용

## 접근성

### 접근성 원칙

1. **WCAG 2.1 AA 준수**: 웹 접근성 가이드라인 준수
2. **키보드 네비게이션**: 모든 인터랙티브 요소 키보드 접근 가능
3. **스크린 리더 지원**: ARIA 속성 및 의미론적 HTML 사용
4. **색상 대비**: 충분한 색상 대비율 보장

### 접근성 기능

#### Focus Management

```tsx
// focus-visible 사용으로 키보드 포커스만 표시
"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";
```

#### ARIA 지원

```tsx
// 버튼 비활성화 시 적절한 ARIA 속성
<Button disabled aria-disabled="true">
  비활성 버튼
</Button>
```

## 테스팅

### 단위 테스트

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@strongorange/ds-ui";

test("renders button with correct variant", () => {
  render(<Button variant="destructive">Delete</Button>);
  const button = screen.getByRole("button");
  expect(button).toHaveClass("bg-destructive");
});
```

### 비주얼 회귀 테스트

1. **Storybook**: 컴포넌트 문서화 및 비주얼 테스트
2. **Chromatic**: 자동화된 비주얼 회귀 테스트
3. **Percy**: 크로스 브라우저 비주얼 테스트

## API 참조

### Button 컴포넌트

#### Props

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean; // Slot 패턴 활성화
  variant?: ButtonVariant; // 스타일 variant
  size?: ButtonSize; // 크기 variant
}

type ButtonVariant =
  | "default" // 기본 primary 스타일
  | "destructive" // 위험한 액션 (삭제 등)
  | "outline" // 테두리만 있는 스타일
  | "secondary" // 보조 액션
  | "ghost" // 배경 없는 스타일
  | "link"; // 링크 스타일

type ButtonSize =
  | "default" // 기본 크기 (h-9)
  | "sm" // 작은 크기 (h-8)
  | "lg" // 큰 크기 (h-10)
  | "icon"; // 아이콘 전용 (정사각형)
```

#### 사용 예시

```tsx
// 기본 사용
<Button>기본 버튼</Button>

// Variant 및 크기 지정
<Button variant="destructive" size="lg">
  삭제하기
</Button>

// asChild로 다른 요소 래핑
<Button asChild>
  <a href="/link">링크 버튼</a>
</Button>

// 커스텀 클래스와 함께 사용
<Button className="w-full">
  전체 너비 버튼
</Button>
```

### cn 유틸리티

#### 함수 시그니처

```tsx
function cn(...inputs: ClassValue[]): string;
```

#### 사용 예시

```tsx
// 기본 클래스 병합
cn("bg-red-500", "text-white"); // "bg-red-500 text-white"

// 조건부 클래스
cn("base-class", {
  "active-class": isActive,
  "disabled-class": isDisabled,
});

// Tailwind 충돌 해결
cn("bg-red-500", "bg-blue-500"); // "bg-blue-500" (마지막 값 우선)

// 배열 지원
cn(["class1", "class2"], "class3"); // "class1 class2 class3"
```

---

## 마무리

이 디자인 시스템은 확장성과 유지보수성을 염두에 두고 설계되었습니다. 새로운 컴포넌트나 기능을 추가할 때는 기존 패턴을 따르고, 문서를 업데이트해 주세요.

### 추가 문서

- [컴포넌트 가이드라인](./docs/component-guidelines.md)
- [디자인 토큰 가이드](./docs/design-tokens.md)
- [기여 가이드](./docs/contributing.md)
- [변경 로그](./CHANGELOG.md)

### 지원

문제가 있거나 제안사항이 있으시면 GitHub Issues를 통해 알려주세요.
