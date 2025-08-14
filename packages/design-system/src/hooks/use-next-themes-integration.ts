/**
 * Hook for integrating with next-themes
 * This hook can be used to get theme value from next-themes and pass it to StyleIsolationProvider
 */

import { useEffect, useState } from "react";

export type NextTheme = "light" | "dark" | "system";

/**
 * Hook to get current theme from next-themes
 * Falls back gracefully if next-themes is not available
 */
export function useNextThemesIntegration() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Try to get theme from next-themes
    if (typeof window !== "undefined") {
      // Check if next-themes is available
      const nextThemesScript = document.querySelector("script[data-theme]");

      if (nextThemesScript) {
        // next-themes is available, read from localStorage or system
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark" || storedTheme === "light") {
          setTheme(storedTheme);
        } else {
          // Check system preference
          const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          setTheme(prefersDark ? "dark" : "light");
        }
      } else {
        // Fallback: check document class
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains("dark")) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }

      // Listen for theme changes
      const observer = new MutationObserver(() => {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains("dark")) {
          setTheme("dark");
        } else if (htmlElement.classList.contains("light")) {
          setTheme("light");
        }
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      // Listen for storage changes (next-themes)
      const handleStorageChange = (e: StorageEvent) => {
        if (
          e.key === "theme" &&
          (e.newValue === "light" || e.newValue === "dark")
        ) {
          setTheme(e.newValue);
        }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => {
        observer.disconnect();
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  return {
    theme,
    mounted,
  };
}

/**
 * Simple hook that returns the current theme for StyleIsolationProvider
 * Use this when you want automatic theme detection
 */
export function useDesignSystemTheme(): "light" | "dark" {
  const { theme } = useNextThemesIntegration();
  return theme;
}
