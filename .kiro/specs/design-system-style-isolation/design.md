# Design Document

## Overview

디자인 시스템 컴포넌트가 toolditor의 기존 globalStyles.ts에 영향받지 않도록 가장 간단한 방법으로 CSS specificity를 높여 스타일 격리를 구현합니다. 복잡한 컴포넌트나 HOC 없이 기본적인 CSS 오버라이드와 간단한 div 래퍼만 사용합니다.

## Architecture

### 독립적인 CSS 격리 전략

기존 `designSystemStyles.css` 파일에 디자인 시스템 컴포넌트가 완전히 독립적으로 동작하도록 하는 CSS 규칙을 추가합니다:

```css
/* designSystemStyles.css에 추가 */
.ds-isolated * {
  all: revert !important;
}

.ds-isolated {
  /* 디자인 시스템의 CSS 변수와 기본 스타일 재적용 */
  @import "@strongorange/ds-ui/styles";
}
```

### 래퍼 컴포넌트 생성

사용자가 간단하게 Button만 import해서 쓸 수 있도록 래퍼 컴포넌트를 만듭니다:

```jsx
// src/components/design-system/Button.tsx
import { Button as OriginalButton } from "@strongorange/ds-ui";

export const Button = (props) => (
  <div className="ds-isolated">
    <OriginalButton {...props} />
  </div>
);
```

### 사용 방법

이제 사용자는 그냥 Button만 import해서 사용하면 됩니다:

```jsx
import { Button } from "@/components/design-system/Button";

// 그냥 평범하게 사용
<Button>디자인 시스템 버튼</Button>;
```

## 구현 방법

### 1. CSS 수정

기존 `apps/toolditor/src/styles/designSystemStyles.css` 파일에 오버라이드 규칙 추가

### 2. HTML 구조 수정

디자인 시스템 컴포넌트 사용 시 `ds-isolated` 클래스를 가진 div로 감싸기

## 문제 해결 원리

특정 CSS 규칙에 매이지 않고 완전히 독립적인 환경을 만듭니다:

1. **완전 격리**: `.ds-isolated * { all: revert !important; }`로 모든 전역 스타일을 무시
2. **디자인 시스템 재적용**: 격리된 영역에서 디자인 시스템 스타일만 다시 적용
3. **투명한 사용**: 사용자는 래퍼를 신경쓰지 않고 Button 컴포넌트만 import해서 사용

이 방식은 globalStyles.ts의 어떤 규칙이 있어도 상관없이 동작합니다.

## 장점

- **단순함**: 복잡한 컴포넌트나 HOC 없이 CSS와 간단한 div만 사용
- **즉시 적용**: 기존 코드 최소 수정으로 바로 해결
- **성능**: 런타임 오버헤드 없음
- **디버깅**: 개발자 도구에서 쉽게 확인 가능
