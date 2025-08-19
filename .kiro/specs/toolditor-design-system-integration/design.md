# Design Document

## Overview

현재 디자인 시스템은 이미 **Tailwind Preset 방식**으로 구현되어 있습니다. toolditor 프로젝트에서는 단순히 Tailwind CSS를 설치하고 디자인 시스템의 preset을 사용하면 됩니다. StyleIsolationProvider 같은 복잡한 격리 메커니즘은 불필요합니다.

## Architecture

### 현재 디자인 시스템 구조 (이미 구현됨)

1. **Tailwind Preset 제공**: `tailwind.preset.js`
2. **CSS 변수 기반 테마**: `--ds-*` 변수들
3. **순수한 Button 컴포넌트**: Tailwind 클래스만 사용
4. **패키지 exports**: 컴포넌트, 스타일, preset 모두 제공

### toolditor 통합 **방법**

1. **Tailwind CSS 설치**: toolditor에 Tailwind 추가
2. **Preset 적용**: 디자인 시스템 preset 사용
3. **CSS import**: 디자인 시스템 스타일 import
4. **컴포넌트 사용**: 바로 import해서 사용

## Components and Interfaces

### 1. 현재 제공되는 것들 (이미 구현됨)

```typescript
// 컴포넌트
export { Button } from "@strongorange/ds-ui";

// 스타일
import "@strongorange/ds-ui/styles";

// Tailwind Preset
const preset = require("@strongorange/ds-ui/tailwind.preset");
```

### 2. toolditor에서 필요한 설정

```javascript
// toolditor/tailwind.config.js (새로 생성)
module.exports = {
  presets: [require("@strongorange/ds-ui/tailwind.preset")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@strongorange/ds-ui/dist/**/*.{js,mjs}",
  ],
};
```

```css
/* toolditor/src/styles/designSystemStyles.css (새로 생성) */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "@strongorange/ds-ui/styles";
```

### 3. UITestSegment 구현

```typescript
// toolditor/src/components/drawer/shared/TestDrawer/UITestSegment.tsx
import React from "react";
import { Button } from "@strongorange/ds-ui";

export const UITestSegment: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>디자인 시스템 테스트</h2>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <Button variant="default">기본 버튼</Button>
        <Button variant="destructive">삭제 버튼</Button>
        <Button variant="outline">아웃라인 버튼</Button>
        <Button variant="secondary">보조 버튼</Button>
        <Button variant="ghost">고스트 버튼</Button>
        <Button variant="link">링크 버튼</Button>
      </div>
    </div>
  );
};
```

## Data Models

### toolditor package.json 추가 의존성

```json
{
  "dependencies": {
    "@strongorange/ds-ui": "^0.1.6"
  },
  "devDependencies": {
    "tailwindcss": "^4.1.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### PostCSS 설정 (toolditor)

```javascript
// toolditor/postcss.config.js (새로 생성)
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## Error Handling

### 1. Tailwind 설치 확인

- toolditor에 Tailwind가 설치되지 않으면 스타일이 적용되지 않음
- 해결: package.json에 의존성 추가

### 2. CSS import 확인

- 디자인 시스템 CSS를 import하지 않으면 CSS 변수가 정의되지 않음
- 해결: 글로벌 CSS 파일에 import 추가

### 3. Content 경로 설정

- Tailwind content에 디자인 시스템 경로가 없으면 클래스가 purge됨
- 해결: node_modules 경로 포함

## Testing Strategy

### 1. 기본 통합 테스트

- 패키지 설치 성공
- Tailwind 설정 적용 성공
- Button 컴포넌트 렌더링 성공

### 2. 스타일 적용 테스트

- 모든 Button variant가 올바른 스타일로 렌더링
- hover 상태 정상 동작
- CSS 변수 정상 적용

### 3. 충돌 테스트

- styled-components 글로벌 스타일과 충돌하지 않음
- toolditor 기존 스타일에 영향 없음

## Implementation Details

### 1. 디자인 시스템 패키지 배포

```bash
# 현재 패키지가 이미 올바르게 구현되어 있으므로 바로 배포
cd packages/design-system
npm run build
npm run publish:gh
```

### 2. toolditor 프로젝트 설정

```bash
# 1. 패키지 설치
npm install @strongorange/ds-ui@0.1.6

# 2. Tailwind CSS 설치
npm install -D tailwindcss@^4.1.0 autoprefixer postcss

# 3. 설정 파일 생성
# - tailwind.config.js
# - postcss.config.js
# - CSS 파일 생성 및 import
```

### 3. 기존 설정 정리

```bash
# toolditor에서 제거할 것들
# - 이전 디자인 시스템 관련 파일들
# - 사용하지 않는 CSS imports
# - 불필요한 의존성들
```

## Performance Considerations

### 1. 번들 크기

- Tailwind JIT가 사용된 클래스만 포함하여 최적화
- 디자인 시스템 CSS는 필요한 변수만 포함

### 2. 빌드 성능

- Tailwind의 빠른 빌드 속도 활용
- PostCSS 파이프라인 최적화

### 3. 런타임 성능

- 정적 CSS 사용으로 런타임 오버헤드 없음
- CSS 변수 기반으로 빠른 테마 적용

## Security Considerations

- 정적 CSS 생성으로 XSS 위험 없음
- 외부 의존성 최소화
- 검증된 Tailwind CSS 사용
