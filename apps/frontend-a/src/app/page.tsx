import { Button } from "@strongorange/ds-ui";

export default function Home() {
  return (
    <div>
      <main>
        <h1 style={{ marginBottom: 16 }}>
          Design System Test - Style Isolation
        </h1>

        <p style={{ marginBottom: 16, color: "#666" }}>
          디자인 시스템의 Button 컴포넌트가 외부 CSS의 영향을 받지 않고 격리되어
          작동하는지 테스트합니다.
        </p>

        <h2>일반 HTML 버튼 (외부 CSS 영향 받음)</h2>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <button>일반 버튼 1</button>
          <button>일반 버튼 2</button>
        </div>

        <h2>디자인 시스템 Button 컴포넌트 (격리됨)</h2>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="link">Link</Button>
        </div>

        <h2>다양한 크기</h2>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🚀</Button>
        </div>
      </main>
    </div>
  );
}
