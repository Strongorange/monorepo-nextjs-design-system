# Implementation Plan

- [ ] 1. designSystemStyles.css에 완전 격리 CSS 규칙 추가

  - 기존 `designSystemStyles.css` 파일에 `.ds-isolated * { all: revert !important; }` 규칙 추가
  - 모든 전역 스타일을 무시하고 디자인 시스템 스타일만 적용되도록 독립적인 환경 구성
  - _Requirements: 1.1, 1.2_

- [ ] 2. 래퍼 Button 컴포넌트 생성

  - `src/components/design-system/Button.tsx` 파일 생성
  - 원본 Button을 `ds-isolated` div로 감싸는 래퍼 컴포넌트 구현
  - 사용자가 간단하게 Button만 import해서 쓸 수 있도록 구성
  - _Requirements: 2.1, 2.3, 4.1_

- [ ] 3. UITestSegment.tsx에서 래퍼 Button 사용

  - 기존 `@strongorange/ds-ui` Button import를 새로운 래퍼 Button으로 변경
  - 사용 방법은 동일하게 유지하면서 자동으로 격리된 환경에서 렌더링
  - _Requirements: 2.3, 4.1_

- [ ] 4. 브라우저에서 동작 확인
  - toolditor 실행하여 Button 스타일이 올바르게 적용되는지 확인
  - globalStyles.ts의 어떤 규칙과도 충돌하지 않고 독립적으로 동작하는지 검증
  - _Requirements: 1.3, 3.2_
