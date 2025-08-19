# Requirements Document

## Introduction

현재 디자인 시스템은 컨슈머 앱이 Tailwind 종속성 없이 사용할 수 있도록 CSS 추출 방식을 사용하고 있습니다. 하지만 이 방식은 다음과 같은 한계가 있습니다:

1. ShadCN 기반 컴포넌트는 Tailwind 유틸리티 클래스를 직접 사용하므로, Tailwind 없이는 스타일이 적용되지 않음
2. Dark mode, variants, arbitrary values 같은 Tailwind의 동적 기능을 활용할 수 없음
3. 복잡한 CSS 추출 및 격리 로직이 필요함

이를 해결하기 위해 **Tailwind Preset 방식**으로 변경하여, 컨슈머 앱이 Tailwind를 설치하되 설정을 최소화하는 방식으로 개선합니다.

**MVP 범위:** 이 프로젝트의 MVP는 Button.tsx 컴포넌트가 디자인 시스템에서 정의한 그대로 컨슈머 앱에서 정확히 렌더링되는 것입니다. StoryBook, 테스트, 추가 컴포넌트, 고급 기능 등은 모두 MVP 범위에서 제외하고 나중에 추가합니다.

## Requirements

### Requirement 1

**User Story:** 개발자로서, 디자인 시스템을 사용할 때 Tailwind Preset을 통해 간단한 설정만으로 모든 디자인 토큰과 스타일을 사용하고 싶습니다.

#### Acceptance Criteria

1. WHEN 컨슈머 앱에서 디자인 시스템의 Tailwind Preset을 import하면 THEN 모든 디자인 토큰(색상, 반지름 등)이 자동으로 적용되어야 합니다
2. WHEN 컨슈머 앱의 tailwind.config.js에 preset만 추가하면 THEN 추가 설정 없이 디자인 시스템 컴포넌트가 정상 작동해야 합니다
3. WHEN 디자인 시스템 패키지를 설치하면 THEN Tailwind Preset 파일이 함께 제공되어야 합니다

### Requirement 2

**User Story:** 개발자로서, Button 컴포넌트가 모든 variant와 size에서 정확한 스타일로 렌더링되기를 원합니다.

#### Acceptance Criteria

1. WHEN Button 컴포넌트를 사용하면 THEN default, secondary, destructive, outline, ghost, link variant가 모두 정상 작동해야 합니다
2. WHEN Button 컴포넌트에 size prop을 전달하면 THEN sm, default, lg, icon 크기가 모두 정확히 적용되어야 합니다
3. WHEN Button 컴포넌트를 hover하면 THEN 각 variant에 맞는 hover 스타일이 적용되어야 합니다

### Requirement 3

**User Story:** 개발자로서, 기존의 디자인 토큰과 CSS 변수를 그대로 유지하면서 새로운 방식으로 마이그레이션하고 싶습니다.

#### Acceptance Criteria

1. WHEN 새로운 Preset 방식을 적용하면 THEN 기존의 CSS 변수(--ds-primary, --ds-secondary 등)가 그대로 유지되어야 합니다
2. WHEN 새로운 방식으로 변경하면 THEN 기존 디자인 토큰의 색상 값과 반지름 값이 동일하게 유지되어야 합니다
3. WHEN 컨슈머 앱에서 Button을 사용하면 THEN 기존과 동일한 시각적 결과를 얻어야 합니다

### Requirement 4

**User Story:** 개발자로서, 복잡한 CSS 추출 로직과 격리 시스템을 제거하고 단순한 구조로 변경하고 싶습니다. (MVP 범위: Button 컴포넌트 작동에 필요한 최소한의 변경만)

#### Acceptance Criteria

1. WHEN 새로운 구조로 변경하면 THEN CSS 추출 관련 PostCSS 플러그인들이 제거되어야 합니다
2. WHEN 새로운 구조로 변경하면 THEN StyleIsolationProvider와 관련 격리 로직이 제거되어야 합니다 (MVP에서는 Button에서만 제거)
3. WHEN 빌드 프로세스를 실행하면 THEN 복잡한 CSS 처리 파이프라인 없이 간단하게 빌드되어야 합니다

### Requirement 5

**User Story:** 개발자로서, 컨슈머 앱에서 최소한의 설정으로 디자인 시스템을 사용하고 싶습니다.

#### Acceptance Criteria

1. WHEN 컨슈머 앱에 Tailwind를 설치하면 THEN tailwind.config.js에 preset 한 줄만 추가하면 되어야 합니다
2. WHEN 컨슈머 앱에서 디자인 시스템 컴포넌트를 import하면 THEN 별도의 CSS import 없이 작동해야 합니다
3. WHEN 컨슈머 앱을 빌드하면 THEN 필요한 Tailwind 클래스만 포함되어 최적화된 CSS가 생성되어야 합니다

### Requirement 6 (MVP 범위 제한)

**User Story:** 개발자로서, MVP에서는 Button 컴포넌트만 완벽하게 작동하도록 하고 나머지 기능은 나중에 추가하고 싶습니다.

#### Acceptance Criteria

1. WHEN MVP를 완료하면 THEN Button 컴포넌트만 Tailwind Preset 방식으로 작동해야 합니다
2. WHEN MVP 작업을 진행하면 THEN StoryBook 설정, 테스트 코드, 추가 컴포넌트는 건드리지 않아야 합니다
3. WHEN MVP를 완료하면 THEN 기존의 다른 컴포넌트나 기능들은 그대로 유지되어야 합니다 (작동하지 않아도 됨)
4. WHEN MVP 검증을 위해 THEN frontend-a 앱에서 Button 컴포넌트가 모든 variant와 size로 정상 렌더링되어야 합니다
5. WHEN MVP 검증을 위해 THEN github packages로 배포된 해당 디자인 시스템을 설치해서 사용하는 기타 글로벌 스타일 등이 있는 성숙한 Next.js 프로젝트에서도 정의한대로 사용할 수 있어야합니다.
