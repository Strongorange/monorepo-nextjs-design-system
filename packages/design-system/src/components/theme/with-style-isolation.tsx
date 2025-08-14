import * as React from "react";
import {
  StyleIsolationProvider,
  StyleIsolationProviderProps,
  useStyleIsolation,
} from "./style-isolation-provider";
import { useStyleInjection } from "../../lib/style-injection";

interface WithStyleIsolationOptions {
  namespace?: string;
  resetStyles?: boolean;
  injectIsolationCSS?: boolean;
  wrapperProps?: Partial<StyleIsolationProviderProps>;
}

/**
 * Higher-order component that wraps a component with style isolation
 */
export function withStyleIsolation<P extends object>(
  Component: React.ComponentType<P>,
  options: WithStyleIsolationOptions = {}
) {
  const {
    namespace = "ds-ui",
    resetStyles = true,
    injectIsolationCSS = true,
    wrapperProps = {},
  } = options;

  const WrappedComponent = React.forwardRef<any, P>((props, ref) => {
    const { injectIsolationStyles } = useStyleInjection(namespace);

    // Inject isolation styles on mount
    React.useEffect(() => {
      if (injectIsolationCSS) {
        injectIsolationStyles();
      }
    }, [injectIsolationStyles, injectIsolationCSS]);

    return (
      <StyleIsolationProvider
        namespace={namespace}
        resetStyles={resetStyles}
        {...wrapperProps}
      >
        <Component {...(props as P)} />
      </StyleIsolationProvider>
    );
  });

  WrappedComponent.displayName = `withStyleIsolation(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
}

/**
 * Hook to access style isolation context with error boundary
 */
export function useStyleIsolationSafe() {
  try {
    return useStyleIsolation();
  } catch {
    // Return default values if not within provider
    return {
      theme: "light" as const,
      namespace: "ds-ui",
      cssVariables: {},
    };
  }
}

/**
 * Component that ensures style isolation is available
 */
export interface EnsureStyleIsolationProps {
  children: React.ReactNode;
  fallbackProps?: WithStyleIsolationOptions;
}

export function EnsureStyleIsolation({
  children,
  fallbackProps = {},
}: EnsureStyleIsolationProps) {
  // Try to use the safe hook to check if context exists
  const context = useStyleIsolationSafe();
  const hasContext = context.namespace !== "ds-ui" || context.theme !== "light";

  if (hasContext) {
    return <>{children}</>;
  }

  // Wrap with default provider if no context exists
  return (
    <StyleIsolationProvider
      namespace={fallbackProps.namespace || "ds-ui"}
      resetStyles={fallbackProps.resetStyles !== false}
      {...fallbackProps.wrapperProps}
    >
      {children}
    </StyleIsolationProvider>
  );
}
