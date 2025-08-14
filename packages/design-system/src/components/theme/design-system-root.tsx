/**
 * Convenient wrapper component that combines StyleIsolationProvider with theme detection
 * This is the recommended way to use the design system in consumer applications
 */

import * as React from "react";
import {
  StyleIsolationProvider,
  StyleIsolationProviderProps,
} from "./style-isolation-provider";
import { useDesignSystemTheme } from "../../hooks/use-next-themes-integration";

export interface DesignSystemRootProps
  extends Omit<StyleIsolationProviderProps, "theme"> {
  /**
   * Override theme detection with explicit theme
   * If not provided, will automatically detect from next-themes or document class
   */
  theme?: "light" | "dark";

  /**
   * Whether to automatically detect theme changes
   * @default true
   */
  autoDetectTheme?: boolean;
}

/**
 * Root component for the design system
 * Automatically handles theme detection and style isolation
 *
 * Usage:
 * ```tsx
 * // Automatic theme detection (recommended)
 * <DesignSystemRoot>
 *   <Button>Click me</Button>
 * </DesignSystemRoot>
 *
 * // Manual theme control
 * <DesignSystemRoot theme="dark">
 *   <Button>Click me</Button>
 * </DesignSystemRoot>
 * ```
 */
export const DesignSystemRoot = React.forwardRef<
  HTMLDivElement,
  DesignSystemRootProps
>(({ theme: explicitTheme, autoDetectTheme = true, ...props }, ref) => {
  const detectedTheme = useDesignSystemTheme();

  // Use explicit theme if provided, otherwise use detected theme
  const currentTheme =
    explicitTheme || (autoDetectTheme ? detectedTheme : "light");

  return <StyleIsolationProvider ref={ref} theme={currentTheme} {...props} />;
});

DesignSystemRoot.displayName = "DesignSystemRoot";
