// Components
export { Button } from "./components/ui/button";
export type { ButtonProps } from "./components/ui/button";

// Legacy provider (kept for backward compatibility)
export { DesignSystemProvider } from "./components/theme/design-system-provider";
export type {
  DesignSystemTheme,
  DesignSystemProviderProps,
} from "./components/theme/design-system-provider";

// New style isolation system
export {
  StyleIsolationProvider,
  useStyleIsolation,
} from "./components/theme/style-isolation-provider";
export type {
  StyleIsolationProviderProps,
  StyleIsolationTheme,
} from "./components/theme/style-isolation-provider";

export {
  withStyleIsolation,
  useStyleIsolationSafe,
  EnsureStyleIsolation,
} from "./components/theme/with-style-isolation";

export { DesignSystemRoot } from "./components/theme/design-system-root";
export type { DesignSystemRootProps } from "./components/theme/design-system-root";

// Hooks
export {
  useDesignSystemTheme,
  useNextThemesIntegration,
} from "./hooks/use-next-themes-integration";

// Utils
export { cn } from "./lib/utils";
export {
  injectStyles,
  removeStyles,
  generateIsolationCSS,
  useStyleInjection,
} from "./lib/style-injection";
