"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

// CSS variables that need to be managed
const CSS_VARIABLES = {
  light: {
    "--ds-background": "#fefefe",
    "--ds-foreground": "#1e2022",
    "--ds-card": "#ffffff",
    "--ds-popover": "#ffffff",
    "--ds-primary": "#0172fe",
    "--ds-primary-hover": "#0167e5",
    "--ds-primary-active": "#014498",
    "--ds-primary-foreground": "#ffffff",
    "--ds-secondary": "#fbfcfd",
    "--ds-secondary-hover": "#f7f8f9",
    "--ds-secondary-foreground": "#1e2022",
    "--ds-muted": "#f7f8f9",
    "--ds-muted-foreground": "#53585c",
    "--ds-accent": "#a670eb",
    "--ds-accent-foreground": "#ffffff",
    "--ds-destructive": "#f83b68",
    "--ds-destructive-hover": "#fe5b7e",
    "--ds-destructive-foreground": "#ffffff",
    "--ds-border": "#e9ebee",
    "--ds-input": "#e9ebee",
    "--ds-ring": "#4d9cfe",
    "--ds-radius": "0.5rem",
  },
  dark: {
    "--ds-background": "#1e2022",
    "--ds-foreground": "#ffffff",
    "--ds-card": "#1e2022",
    "--ds-popover": "#1e2022",
    "--ds-primary": "#0172fe",
    "--ds-primary-hover": "#4d9cfe",
    "--ds-primary-active": "#0167e5",
    "--ds-primary-foreground": "#ffffff",
    "--ds-secondary": "#3d4044",
    "--ds-secondary-hover": "#53585c",
    "--ds-secondary-foreground": "#ffffff",
    "--ds-muted": "#2e3236",
    "--ds-muted-foreground": "#b3bac2",
    "--ds-accent": "#977aec",
    "--ds-accent-foreground": "#ffffff",
    "--ds-destructive": "#f83b68",
    "--ds-destructive-hover": "#fe5b7e",
    "--ds-destructive-foreground": "#ffffff",
    "--ds-border": "#3d4044",
    "--ds-input": "#3d4044",
    "--ds-ring": "#4d9cfe",
    "--ds-radius": "0.5rem",
  },
} as const;

export type StyleIsolationTheme = "light" | "dark";

export interface StyleIsolationContextValue {
  theme: StyleIsolationTheme;
  namespace: string;
  cssVariables: Record<string, string>;
}

const StyleIsolationContext =
  React.createContext<StyleIsolationContextValue | null>(null);

export interface StyleIsolationProviderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  theme?: StyleIsolationTheme;
  namespace?: string;
  resetStyles?: boolean;
  children: React.ReactNode;
}

/**
 * Hook to access style isolation context
 */
export function useStyleIsolation() {
  const context = React.useContext(StyleIsolationContext);
  if (!context) {
    throw new Error(
      "useStyleIsolation must be used within a StyleIsolationProvider"
    );
  }
  return context;
}

/**
 * Hook to detect current theme from next-themes or fallback to light
 */
function useCurrentTheme(
  providedTheme?: StyleIsolationTheme
): StyleIsolationTheme {
  const [currentTheme, setCurrentTheme] =
    React.useState<StyleIsolationTheme>("light");

  React.useEffect(() => {
    if (providedTheme) {
      setCurrentTheme(providedTheme);
      return;
    }

    // Try to detect theme from next-themes or document
    if (typeof window !== "undefined") {
      const htmlElement = document.documentElement;

      // Check for next-themes class
      if (htmlElement.classList.contains("dark")) {
        setCurrentTheme("dark");
      } else if (htmlElement.classList.contains("light")) {
        setCurrentTheme("light");
      }

      // Watch for theme changes
      const observer = new MutationObserver(() => {
        if (htmlElement.classList.contains("dark")) {
          setCurrentTheme("dark");
        } else if (htmlElement.classList.contains("light")) {
          setCurrentTheme("light");
        }
      });

      observer.observe(htmlElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    }
  }, [providedTheme]);

  return currentTheme;
}

/**
 * Style Isolation Provider - focuses only on CSS variable injection and namespace isolation
 * Theme management is delegated to external providers like next-themes
 */
export const StyleIsolationProvider = React.forwardRef<
  HTMLDivElement,
  StyleIsolationProviderProps
>(
  (
    {
      asChild = false,
      theme,
      namespace = "ds-ui",
      resetStyles = true,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    // Use provided theme or detect from next-themes
    const currentTheme = useCurrentTheme(theme);

    // Get CSS variables for current theme
    const cssVariables = React.useMemo(() => {
      return CSS_VARIABLES[currentTheme];
    }, [currentTheme]);

    // Combine inline styles with CSS variables
    const combinedStyle = React.useMemo(() => {
      return {
        ...cssVariables,
        ...style,
      };
    }, [cssVariables, style]);

    // Context value - simplified without theme management
    const contextValue = React.useMemo<StyleIsolationContextValue>(
      () => ({
        theme: currentTheme,
        namespace,
        cssVariables,
      }),
      [currentTheme, namespace, cssVariables]
    );

    // Generate class names for isolation
    const isolationClasses = React.useMemo(() => {
      const classes = [
        `${namespace}-root`, // Namespace root
        `${namespace}-theme-${currentTheme}`, // Theme-specific class
      ];

      if (resetStyles) {
        classes.push(`${namespace}-reset`); // Reset styles class
      }

      return classes;
    }, [namespace, currentTheme, resetStyles]);

    return (
      <StyleIsolationContext.Provider value={contextValue}>
        <Comp
          ref={ref as any}
          data-ds-theme={currentTheme}
          data-ds-namespace={namespace}
          className={cn(...isolationClasses, className)}
          style={combinedStyle}
          {...props}
        >
          {children}
        </Comp>
      </StyleIsolationContext.Provider>
    );
  }
);

StyleIsolationProvider.displayName = "StyleIsolationProvider";
