/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { DesignSystemRoot } from "../design-system-root";
import { useStyleIsolation } from "../style-isolation-provider";

// Mock component to test context
function TestComponent() {
  const { theme, namespace } = useStyleIsolation();
  return (
    <div data-testid="test-component">
      <span data-testid="theme">{theme}</span>
      <span data-testid="namespace">{namespace}</span>
    </div>
  );
}

describe("DesignSystemRoot", () => {
  beforeEach(() => {
    // Reset document classes
    document.documentElement.className = "";
    // Clear localStorage
    localStorage.clear();
  });

  it("should render with default light theme", () => {
    render(
      <DesignSystemRoot>
        <TestComponent />
      </DesignSystemRoot>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(screen.getByTestId("namespace")).toHaveTextContent("ds-ui");
  });

  it("should use explicit theme when provided", () => {
    render(
      <DesignSystemRoot theme="dark">
        <TestComponent />
      </DesignSystemRoot>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("should detect dark theme from document class", () => {
    document.documentElement.classList.add("dark");

    render(
      <DesignSystemRoot>
        <TestComponent />
      </DesignSystemRoot>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("should detect light theme from document class", () => {
    document.documentElement.classList.add("light");

    render(
      <DesignSystemRoot>
        <TestComponent />
      </DesignSystemRoot>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("should pass through StyleIsolationProvider props", () => {
    const { container } = render(
      <DesignSystemRoot namespace="custom-ns" resetStyles={false}>
        <TestComponent />
      </DesignSystemRoot>
    );

    expect(screen.getByTestId("namespace")).toHaveTextContent("custom-ns");

    const provider = container.firstChild as HTMLElement;
    expect(provider).not.toHaveClass("custom-ns-reset");
  });

  it("should disable auto theme detection when requested", () => {
    document.documentElement.classList.add("dark");

    render(
      <DesignSystemRoot autoDetectTheme={false}>
        <TestComponent />
      </DesignSystemRoot>
    );

    // Should use default light theme instead of detecting dark
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("should prioritize explicit theme over auto detection", () => {
    document.documentElement.classList.add("dark");

    render(
      <DesignSystemRoot theme="light" autoDetectTheme={true}>
        <TestComponent />
      </DesignSystemRoot>
    );

    // Explicit theme should override detection
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("should work with asChild prop", () => {
    const { container } = render(
      <DesignSystemRoot asChild>
        <main data-testid="custom-root">
          <TestComponent />
        </main>
      </DesignSystemRoot>
    );

    const element = screen.getByTestId("custom-root");
    expect(element.tagName).toBe("MAIN");
    expect(element).toHaveClass("ds-ui-root");
  });
});
