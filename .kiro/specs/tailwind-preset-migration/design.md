# Design Document

## Overview

현재 디자인 시스템은 CSS 추출 및 격리 방식을 사용하여 컨슈머 앱이 Tailwind 없이도 사용할 수 있도록 설계되었습니다. 하지만 ShadCN 기반 컴포넌트의 특성상 Tailwind 유틸리티 클래스에 의존하므로, 이 방식은 근본적인 한계가 있습니다.

새로운 설계는 **Tailwind Preset 방식**을 채택하여:

1. 컨슈머 앱이 Tailwind를 설치하되 설정을 최소화
2. 디자인 시스템에서 Tailwind Preset을 제공
3. 복잡한 CSS 추출 및 격리 로직 제거
4. MVP 범위: Button 컴포넌트만 완벽하게 작동

## Architecture

### 현재 구조 (제거할 부분)

```
packages/design-system/
├── build/                          # 제거: 복잡한 빌드 로직
│   ├── postcss-plugins/            # 제거: 커스텀 PostCSS 플러그인들
│   ├── extract-classes.js          # 제거: CSS 클래스 추출
│   └── config.js                   # 제거: 빌드 설정
├── postcss.config.js               # 단순화: 기본 Tailwind + Autoprefixer만
├── src/components/theme/            # 제거: 격리 관련 컴포넌트들
│   ├── style-isolation-provider.tsx
│   ├── design-system-root.tsx
│   └── with-style-isolation.tsx
└── src/lib/style-injection.ts      # 제거: 동적 스타일 주입
```

### 새로운 구조 (Tailwind Preset 방식)

```
packages/design-system/
├── tailwind.preset.js              # 새로 생성: Tailwind Preset
├── src/
│   ├── components/ui/
│   │   └── button.tsx              # 단순화: 격리 로직 제거
│   ├── lib/
│   │   └── utils.ts                # 유지: cn 함수
│   └── styles.css                  # 단순화: 기본 CSS 변수만
├── package.json                    # 수정: exports에 preset 추가
└── tsup.config.ts                  # 단순화: CSS 처리 파이프라인 제거
```

### 컨슈머 앱 구조

```
apps/frontend-a/
├── tailwind.config.js              # 수정: preset 사용
├── src/app/
│   ├── globals.css                 # 새로 생성: Tailwind directives
│   └── layout.tsx                  # 수정: CSS import
└── package.json                    # 수정: Tailwind 의존성 추가
```

## Components and Interfaces

### 1. Tailwind Preset (`tailwind.preset.js`)

디자인 시스템의 모든 디자인 토큰을 포함하는 Tailwind Preset:

```javascript
// packages/design-system/tailwind.preset.js
module.exports = {
  theme: {
    extend: {
      colors: {
        border: "var(--ds-border)",
        input: "var(--ds-input)",
        ring: "var(--ds-ring)",
        background: "var(--ds-background)",
        foreground: "var(--ds-foreground)",
        primary: {
          DEFAULT: "var(--ds-primary)",
          foreground: "var(--ds-primary-foreground)",
        },
        // ... 모든 디자인 토큰
      },
      borderRadius: {
        lg: "var(--ds-radius)",
        md: "calc(var(--ds-radius) - 2px)",
        sm: "calc(var(--ds-radius) - 4px)",
      },
    },
  },
  plugins: [],
};
```

### 2. 단순화된 Button 컴포넌트

격리 로직을 제거하고 순수한 Tailwind 클래스만 사용:

```typescript
// packages/design-system/src/components/ui/button.tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
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

### 3. 단순화된 CSS 파일

복잡한 격리 로직 없이 기본 CSS 변수만:

```css
/* packages/design-system/src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --ds-background: #fefefe;
    --ds-foreground: #1e2022;
    --ds-primary: #0172fe;
    /* ... 모든 CSS 변수 */
  }

  .dark {
    --ds-background: #1e2022;
    --ds-foreground: #ffffff;
    /* ... 다크 모드 변수 */
  }
}
```

### 4. 컨슈머 앱 설정

최소한의 설정으로 디자인 시스템 사용:

```javascript
// apps/frontend-a/tailwind.config.js
module.exports = {
  presets: [require("@strongorange/ds-ui/tailwind.preset")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@strongorange/ds-ui/dist/**/*.{js,mjs}",
  ],
};
```

```css
/* apps/frontend-a/src/app/globals.css */
@import "@strongorange/ds-ui/styles";
```

## Data Models

### Package.json Exports

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

### 제거할 Exports

- `"./styles.isolated"`: 격리된 CSS 제거
- `"./tailwind.config"`: 기존 설정 파일 제거

## Error Handling

### 1. Tailwind 미설치 에러

컨슈머 앱에서 Tailwind가 설치되지 않은 경우:

- Button 컴포넌트의 스타일이 적용되지 않음
- 개발자 도구에서 Tailwind 클래스가 인식되지 않음
- 해결: package.json에 Tailwind 설치 가이드 추가

### 2. Preset 미적용 에러

컨슈머 앱에서 preset을 적용하지 않은 경우:

- 디자인 토큰 색상이 적용되지 않음
- CSS 변수가 인식되지 않음
- 해결: README에 설정 가이드 추가

### 3. Content 경로 누락 에러

Tailwind content 경로에 디자인 시스템이 포함되지 않은 경우:

- 디자인 시스템의 클래스가 purge됨
- 해결: content 경로에 node_modules 경로 포함

## Testing Strategy

### MVP 테스트 범위

1. **Button 컴포넌트 렌더링 테스트**

   - 모든 variant (default, secondary, destructive, outline, ghost, link) 렌더링
   - 모든 size (sm, default, lg, icon) 렌더링
   - hover 상태 스타일 적용

2. **컨슈머 앱 통합 테스트**

   - frontend-a 앱에서 Button 컴포넌트 정상 작동
   - Tailwind 클래스 정상 적용
   - CSS 변수 정상 적용

3. **빌드 테스트**
   - 디자인 시스템 패키지 빌드 성공
   - 컨슈머 앱 빌드 성공
   - 최종 CSS 파일에 필요한 클래스만 포함

### 테스트하지 않는 부분 (MVP 범위 외)

- StoryBook 설정
- 다른 컴포넌트들
- 격리 관련 기능들
- 고급 테마 기능들

## Migration Strategy

### Phase 1: 디자인 시스템 구조 변경

1. Tailwind Preset 파일 생성
2. Button 컴포넌트에서 격리 로직 제거
3. 복잡한 빌드 로직 제거
4. package.json exports 수정

### Phase 2: 컨슈머 앱 설정 변경

1. frontend-a에 Tailwind 설치
2. tailwind.config.js에 preset 적용
3. globals.css에 스타일 import
4. 기존 CSS import 제거

### Phase 3: 검증

1. Button 컴포넌트 모든 variant/size 테스트
2. 시각적 결과가 기존과 동일한지 확인
3. 빌드 프로세스 정상 작동 확인

## Performance Considerations

### 장점

1. **빌드 시간 단축**: 복잡한 CSS 처리 파이프라인 제거
2. **번들 크기 최적화**: Tailwind JIT가 사용된 클래스만 포함
3. **개발 경험 향상**: Hot reload 속도 개선

### 주의사항

1. **컨슈머 앱 의존성 증가**: Tailwind 설치 필요
2. **초기 설정 복잡도**: preset 설정 필요 (하지만 한 번만)

## Security Considerations

- CSS 변수 주입 로직 제거로 XSS 위험 감소
- 정적 CSS 생성으로 런타임 보안 위험 제거
- 외부 의존성 감소 (PostCSS 플러그인들 제거)
