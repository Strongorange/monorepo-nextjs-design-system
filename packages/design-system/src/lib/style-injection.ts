/**
 * Utility functions for dynamic CSS injection and management
 * Handles SSR-safe style injection and prevents FOUC
 */

interface StyleInjectionOptions {
  namespace: string;
  id?: string;
  priority?: number;
}

/**
 * Injects CSS styles into the document head
 * SSR-safe and prevents duplicate injections
 */
export function injectStyles(
  css: string,
  options: StyleInjectionOptions
): void {
  if (typeof document === "undefined") {
    // Skip injection during SSR
    return;
  }

  const { namespace, id = "default", priority = 0 } = options;
  const styleId = `${namespace}-styles-${id}`;

  // Check if styles are already injected
  if (document.getElementById(styleId)) {
    return;
  }

  const styleElement = document.createElement("style");
  styleElement.id = styleId;
  styleElement.setAttribute("data-namespace", namespace);
  styleElement.setAttribute("data-priority", priority.toString());
  styleElement.textContent = css;

  // Insert based on priority (higher priority = later in head)
  const existingStyles = Array.from(
    document.querySelectorAll(`style[data-namespace="${namespace}"]`)
  );

  const insertBefore = existingStyles.find(
    (style) => parseInt(style.getAttribute("data-priority") || "0") > priority
  );

  if (insertBefore) {
    document.head.insertBefore(styleElement, insertBefore);
  } else {
    document.head.appendChild(styleElement);
  }
}

/**
 * Removes injected styles
 */
export function removeStyles(namespace: string, id: string = "default"): void {
  if (typeof document === "undefined") {
    return;
  }

  const styleId = `${namespace}-styles-${id}`;
  const styleElement = document.getElementById(styleId);

  if (styleElement) {
    styleElement.remove();
  }
}

/**
 * Generates CSS for style isolation
 */
export function generateIsolationCSS(namespace: string): string {
  return `
    /* Style Isolation CSS for ${namespace} */
    .${namespace}-root {
      /* Create isolated stacking context */
      position: relative;
      z-index: 0;
      
      /* Prevent style leakage */
      contain: style;
      
      /* Ensure proper box model */
      box-sizing: border-box;
    }
    
    .${namespace}-root *,
    .${namespace}-root *::before,
    .${namespace}-root *::after {
      box-sizing: border-box;
    }
    
    /* Reset styles for isolation */
    .${namespace}-reset {
      /* Defensive CSS to prevent external interference */
      all: initial;
      
      /* Restore essential properties */
      display: block;
      position: relative;
      box-sizing: border-box;
      
      /* Font inheritance for text elements */
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
    }
    
    /* High specificity overrides */
    .${namespace}-root.${namespace}-root.${namespace}-root {
      /* Triple specificity for strong isolation */
      isolation: isolate;
    }
    
    /* Theme-specific isolation */
    .${namespace}-theme-light {
      color-scheme: light;
    }
    
    .${namespace}-theme-dark {
      color-scheme: dark;
    }
  `;
}

/**
 * Hook for managing dynamic style injection
 */
export function useStyleInjection(namespace: string) {
  const inject = React.useCallback(
    (css: string, options: Omit<StyleInjectionOptions, "namespace"> = {}) => {
      injectStyles(css, { namespace, ...options });
    },
    [namespace]
  );

  const remove = React.useCallback(
    (id: string = "default") => {
      removeStyles(namespace, id);
    },
    [namespace]
  );

  const injectIsolationStyles = React.useCallback(() => {
    const css = generateIsolationCSS(namespace);
    inject(css, { id: "isolation", priority: -1 });
  }, [namespace, inject]);

  return {
    inject,
    remove,
    injectIsolationStyles,
  };
}

// Import React for the hook
import * as React from "react";
