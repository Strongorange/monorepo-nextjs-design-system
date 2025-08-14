/**
 * Theme synchronization utilities for SSR/CSR consistency
 * Prevents hydration mismatches and ensures theme consistency
 */

export type ThemeSyncMode = "system" | "manual" | "inherit";

interface ThemeSyncOptions {
  namespace: string;
  mode: ThemeSyncMode;
  defaultTheme: "light" | "dark";
  storageKey?: string;
}

/**
 * Detects the current theme from various sources
 */
export function detectCurrentTheme(
  options: ThemeSyncOptions
): "light" | "dark" {
  const { mode, defaultTheme, storageKey } = options;

  // During SSR, always return default theme to prevent hydration mismatch
  if (typeof window === "undefined") {
    return defaultTheme;
  }

  switch (mode) {
    case "system":
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    case "manual":
      if (storageKey) {
        const stored = localStorage.getItem(storageKey);
        if (stored === "light" || stored === "dark") {
          return stored;
        }
      }
      return defaultTheme;

    case "inherit":
      // Check parent elements for theme indicators
      const html = document.documentElement;
      if (html.classList.contains("dark")) return "dark";
      if (html.classList.contains("light")) return "light";
      if (html.getAttribute("data-theme") === "dark") return "dark";
      if (html.getAttribute("data-theme") === "light") return "light";

      // Fall back to system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    default:
      return defaultTheme;
  }
}

/**
 * Synchronizes theme across multiple instances
 */
export class ThemeSync {
  private listeners: Set<(theme: "light" | "dark") => void> = new Set();
  private currentTheme: "light" | "dark";
  private options: ThemeSyncOptions;
  private mediaQuery?: MediaQueryList;
  private storageListener?: () => void;

  constructor(options: ThemeSyncOptions) {
    this.options = options;
    this.currentTheme = detectCurrentTheme(options);
    this.setupListeners();
  }

  private setupListeners() {
    if (typeof window === "undefined") return;

    // System theme changes
    if (this.options.mode === "system" || this.options.mode === "inherit") {
      this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      this.mediaQuery.addEventListener("change", this.handleSystemThemeChange);
    }

    // Storage changes (for manual mode)
    if (this.options.mode === "manual" && this.options.storageKey) {
      this.storageListener = () => {
        const newTheme = detectCurrentTheme(this.options);
        if (newTheme !== this.currentTheme) {
          this.setTheme(newTheme);
        }
      };
      window.addEventListener("storage", this.storageListener);
    }

    // DOM mutations for inherit mode
    if (this.options.mode === "inherit") {
      const observer = new MutationObserver(() => {
        const newTheme = detectCurrentTheme(this.options);
        if (newTheme !== this.currentTheme) {
          this.setTheme(newTheme);
        }
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });
    }
  }

  private handleSystemThemeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? "dark" : "light";
    this.setTheme(newTheme);
  };

  public subscribe(listener: (theme: "light" | "dark") => void) {
    this.listeners.add(listener);

    // Immediately call with current theme
    listener(this.currentTheme);

    return () => {
      this.listeners.delete(listener);
    };
  }

  public setTheme(theme: "light" | "dark") {
    if (theme === this.currentTheme) return;

    this.currentTheme = theme;

    // Persist to storage if in manual mode
    if (this.options.mode === "manual" && this.options.storageKey) {
      localStorage.setItem(this.options.storageKey, theme);
    }

    // Notify all listeners
    this.listeners.forEach((listener) => listener(theme));
  }

  public getCurrentTheme(): "light" | "dark" {
    return this.currentTheme;
  }

  public destroy() {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener(
        "change",
        this.handleSystemThemeChange
      );
    }

    if (this.storageListener) {
      window.removeEventListener("storage", this.storageListener);
    }

    this.listeners.clear();
  }
}

/**
 * React hook for theme synchronization
 */
export function useThemeSync(options: ThemeSyncOptions) {
  const [theme, setTheme] = React.useState<"light" | "dark">(() =>
    detectCurrentTheme(options)
  );

  const [isSSR, setIsSSR] = React.useState(true);
  const syncRef = React.useRef<ThemeSync | null>(null);

  React.useEffect(() => {
    setIsSSR(false);

    // Initialize theme sync
    syncRef.current = new ThemeSync(options);

    const unsubscribe = syncRef.current.subscribe(setTheme);

    return () => {
      unsubscribe();
      syncRef.current?.destroy();
    };
  }, [
    options.namespace,
    options.mode,
    options.defaultTheme,
    options.storageKey,
  ]);

  const updateTheme = React.useCallback((newTheme: "light" | "dark") => {
    syncRef.current?.setTheme(newTheme);
  }, []);

  return {
    theme,
    setTheme: updateTheme,
    isSSR,
  };
}

// Import React for the hook
import * as React from "react";
