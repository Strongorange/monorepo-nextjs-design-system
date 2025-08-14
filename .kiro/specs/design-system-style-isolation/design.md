# Design Document

## Overview

디자인 시스템의 스타일 격리 문제를 해결하기 위해 **하이브리드 접근법**을 채택합니다. 개발 시에는 Tailwind CSS를 사용하되, 빌드 시점에 필요한 CSS만 추출하여 고유한 네임스페이스와 높은 특이성을 가진 CSS로 변환합니다. 이를 통해 컨슈머 프로젝트의 Tailwind 의존성을 제거하고 스타일 충돌을 방지합니다.

## Architecture

### 핵심 아키텍처 원칙

1. **개발 시**: shadcn/ui + Tailwind CSS 사용으로 개발 경험 최적화
2. **빌드 시**: Tailwind 클래스를 실제 CSS로 컴파일하고 고유 네임스페이스 적용
3. **런타임**: 컨슈머 프로젝트에서는 순수 CSS만 사용, Tailwind 의존성 없음
4. **격리**: 높은 CSS 특이성과 고유 클래스명으로 외부 스타일과 격리

### 시스템 구성도

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   개발 환경      │    │   빌드 프로세스   │    │  배포 패키지     │
│                │    │                 │    │                │
│ shadcn/ui      │───▶│ Tailwind 컴파일  │───▶│ 격리된 CSS      │
│ + Tailwind     │    │ + 네임스페이스   │    │ + React 컴포넌트 │
│                │    │ + 특이성 증가    │    │                │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │ 컨슈머 프로젝트  │
                                              │                │
                                              │ ✅ Tailwind 불필요│
                                              │ ✅ 스타일 격리   │
                                              │ ✅ SSR 호환     │
                                              └─────────────────┘
```

## Components and Interfaces

### 1. 빌드 시스템 컴포넌트

#### TailwindExtractor

```typescript
interface TailwindExtractor {
  extractUsedClasses(componentFiles: string[]): string[];
  generateCSS(classes: string[]): string;
  applyNamespace(css: string, namespace: string): string;
}
```

#### SpecificityBooster

```typescript
interface SpecificityBooster {
  increaseSpecificity(css: string, level: number): string;
  addImportantFlags(css: string): string;
  generateUniqueSelectors(css: string): string;
}
```

#### StyleIsolator

```typescript
interface StyleIsolator {
  wrapWithNamespace(css: string): string;
  addResetStyles(css: string): string;
  preventLeakage(css: string): string;
}
```

### 2. 런타임 컴포넌트

#### IsolatedStyleProvider

```typescript
interface IsolatedStyleProviderProps {
  children: React.ReactNode;
  namespace?: string;
  resetStyles?: boolean;
}

const IsolatedStyleProvider: React.FC<IsolatedStyleProviderProps>;
```

#### 컴포넌트 래퍼 시스템

```typescript
// 기존 Button 컴포넌트를 래핑
const IsolatedButton = withStyleIsolation(Button, {
  namespace: "ds-ui",
  resetTarget: true,
});
```

## Data Models

### 스타일 격리 설정

```typescript
interface StyleIsolationConfig {
  namespace: string; // 고유 네임스페이스 (예: 'ds-ui')
  specificityLevel: number; // CSS 특이성 레벨 (1-5)
  useImportant: boolean; // !important 사용 여부
  resetStyles: boolean; // 컴포넌트별 CSS reset 적용
  extractedCSS: string; // 추출된 CSS 문자열
}
```

### 빌드 메타데이터

```typescript
interface BuildMetadata {
  tailwindClasses: string[]; // 사용된 Tailwind 클래스 목록
  generatedCSS: string; // 생성된 CSS
  componentMap: Map<string, string[]>; // 컴포넌트별 클래스 매핑
  cssVariables: Record<string, string>; // CSS 변수 매핑
}
```

## Error Handling

### 1. 빌드 타임 에러 처리

**Tailwind 클래스 누락**

- 사용되지 않은 클래스 감지 및 경고
- 필수 클래스 누락 시 빌드 실패
- 대체 클래스 제안 시스템

**CSS 생성 실패**

- Tailwind 설정 오류 감지
- PostCSS 처리 오류 핸들링
- 폴백 CSS 생성

### 2. 런타임 에러 처리

**스타일 로딩 실패**

- CSS 파일 로딩 실패 시 기본 스타일 적용
- 네트워크 오류 시 인라인 스타일 폴백
- 개발 모드에서 상세 에러 메시지 제공

**테마 적용 실패**

- CSS 변수 누락 시 기본값 사용
- 테마 전환 실패 시 이전 테마 유지
- 브라우저 호환성 문제 시 폴백 처리

## Testing Strategy

### 1. 빌드 프로세스 테스트

**CSS 추출 테스트**

```typescript
describe("TailwindExtractor", () => {
  it("should extract only used Tailwind classes", () => {
    const extractor = new TailwindExtractor();
    const classes = extractor.extractUsedClasses(["Button.tsx"]);
    expect(classes).toContain("bg-primary");
    expect(classes).not.toContain("bg-unused-color");
  });
});
```

**특이성 증가 테스트**

```typescript
describe("SpecificityBooster", () => {
  it("should increase CSS specificity correctly", () => {
    const booster = new SpecificityBooster();
    const result = booster.increaseSpecificity(".btn", 3);
    expect(result).toBe(".ds-ui.ds-ui.ds-ui .btn");
  });
});
```

### 2. 스타일 격리 테스트

**외부 스타일 간섭 테스트**

```typescript
describe("Style Isolation", () => {
  it("should maintain button styles despite global reset", () => {
    // 강력한 글로벌 reset 적용
    const globalReset = `
      * { margin: 0; padding: 0; border: 0; background: none; }
      button { all: unset; }
    `;

    // 디자인 시스템 버튼 렌더링
    const { getByRole } = render(<Button>Test</Button>);
    const button = getByRole("button");

    // 스타일이 올바르게 적용되었는지 확인
    expect(button).toHaveStyle({
      backgroundColor: "var(--ds-primary)",
      padding: "0.5rem 1rem",
    });
  });
});
```

### 3. SSR/CSR 호환성 테스트

**Hydration 테스트**

```typescript
describe("SSR Compatibility", () => {
  it("should not cause hydration mismatch", async () => {
    const serverHTML = renderToString(<Button>Server</Button>);
    const { container } = render(<Button>Server</Button>);

    expect(container.innerHTML).toBe(serverHTML);
  });
});
```

### 4. 성능 테스트

**번들 크기 테스트**

- 추출된 CSS 크기 모니터링
- 사용하지 않는 스타일 제거 확인
- 압축 효율성 측정

**런타임 성능 테스트**

- 스타일 적용 시간 측정
- 메모리 사용량 모니터링
- 리렌더링 성능 확인

## Implementation Approach

### Phase 1: 빌드 시스템 구축

1. Tailwind CSS 클래스 추출 도구 개발
2. CSS 네임스페이스 및 특이성 증가 시스템 구현
3. PostCSS 플러그인 체인 구성

### Phase 2: 런타임 격리 시스템

1. 스타일 프로바이더 컴포넌트 개발
2. 컴포넌트 래퍼 시스템 구현
3. CSS 변수 관리 시스템 구축

### Phase 3: 테스트 및 최적화

1. 다양한 환경에서의 호환성 테스트
2. 성능 최적화 및 번들 크기 최소화
3. 개발자 경험 개선 도구 제공

이 설계를 통해 개발 시에는 Tailwind의 편의성을 유지하면서도, 배포 시에는 완전히 격리된 스타일 시스템을 제공할 수 있습니다.
