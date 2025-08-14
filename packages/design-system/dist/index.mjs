"use client";

// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/button.tsx
import { jsx } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium normal-case not-italic tracking-normal appearance-none box-border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React.forwardRef(
  ({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(
          "ds-Button",
          buttonVariants({ variant, size, className })
        ),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/components/theme/design-system-provider.tsx
import * as React2 from "react";
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { jsx as jsx2 } from "react/jsx-runtime";
var DesignSystemProvider = React2.forwardRef(({ asChild = false, theme = "inherit", className, ...props }, ref) => {
  const Comp = asChild ? Slot2 : "div";
  const darkClassName = theme === "dark" ? "dark" : theme === "light" ? void 0 : void 0;
  return /* @__PURE__ */ jsx2(
    Comp,
    {
      "data-ds-theme": true,
      className: cn(darkClassName, className),
      ref,
      ...props
    }
  );
});
DesignSystemProvider.displayName = "DesignSystemProvider";

// src/components/theme/style-isolation-provider.tsx
import * as React3 from "react";
import { Slot as Slot3 } from "@radix-ui/react-slot";
import { jsx as jsx3 } from "react/jsx-runtime";
var CSS_VARIABLES = {
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
    "--ds-radius": "0.5rem"
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
    "--ds-radius": "0.5rem"
  }
};
var StyleIsolationContext = React3.createContext(null);
function useStyleIsolation() {
  const context = React3.useContext(StyleIsolationContext);
  if (!context) {
    throw new Error(
      "useStyleIsolation must be used within a StyleIsolationProvider"
    );
  }
  return context;
}
function useCurrentTheme(providedTheme) {
  const [currentTheme, setCurrentTheme] = React3.useState("light");
  React3.useEffect(() => {
    if (providedTheme) {
      setCurrentTheme(providedTheme);
      return;
    }
    if (typeof window !== "undefined") {
      const htmlElement = document.documentElement;
      if (htmlElement.classList.contains("dark")) {
        setCurrentTheme("dark");
      } else if (htmlElement.classList.contains("light")) {
        setCurrentTheme("light");
      }
      const observer = new MutationObserver(() => {
        if (htmlElement.classList.contains("dark")) {
          setCurrentTheme("dark");
        } else if (htmlElement.classList.contains("light")) {
          setCurrentTheme("light");
        }
      });
      observer.observe(htmlElement, {
        attributes: true,
        attributeFilter: ["class"]
      });
      return () => observer.disconnect();
    }
  }, [providedTheme]);
  return currentTheme;
}
var StyleIsolationProvider = React3.forwardRef(
  ({
    asChild = false,
    theme,
    namespace = "ds-ui",
    resetStyles = true,
    className,
    children,
    style,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot3 : "div";
    const currentTheme = useCurrentTheme(theme);
    const cssVariables = React3.useMemo(() => {
      return CSS_VARIABLES[currentTheme];
    }, [currentTheme]);
    const combinedStyle = React3.useMemo(() => {
      return {
        ...cssVariables,
        ...style
      };
    }, [cssVariables, style]);
    const contextValue = React3.useMemo(
      () => ({
        theme: currentTheme,
        namespace,
        cssVariables
      }),
      [currentTheme, namespace, cssVariables]
    );
    const isolationClasses = React3.useMemo(() => {
      const classes = [
        `${namespace}-root`,
        // Namespace root
        `${namespace}-theme-${currentTheme}`
        // Theme-specific class
      ];
      if (resetStyles) {
        classes.push(`${namespace}-reset`);
      }
      return classes;
    }, [namespace, currentTheme, resetStyles]);
    return /* @__PURE__ */ jsx3(StyleIsolationContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx3(
      Comp,
      {
        ref,
        "data-ds-theme": currentTheme,
        "data-ds-namespace": namespace,
        className: cn(...isolationClasses, className),
        style: combinedStyle,
        ...props,
        children
      }
    ) });
  }
);
StyleIsolationProvider.displayName = "StyleIsolationProvider";

// src/components/theme/with-style-isolation.tsx
import * as React5 from "react";

// src/lib/style-injection.ts
import * as React4 from "react";
function injectStyles(css, options) {
  if (typeof document === "undefined") {
    return;
  }
  const { namespace, id = "default", priority = 0 } = options;
  const styleId = `${namespace}-styles-${id}`;
  if (document.getElementById(styleId)) {
    return;
  }
  const styleElement = document.createElement("style");
  styleElement.id = styleId;
  styleElement.setAttribute("data-namespace", namespace);
  styleElement.setAttribute("data-priority", priority.toString());
  styleElement.textContent = css;
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
function removeStyles(namespace, id = "default") {
  if (typeof document === "undefined") {
    return;
  }
  const styleId = `${namespace}-styles-${id}`;
  const styleElement = document.getElementById(styleId);
  if (styleElement) {
    styleElement.remove();
  }
}
function generateIsolationCSS(namespace) {
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
function useStyleInjection(namespace) {
  const inject = React4.useCallback(
    (css, options = {}) => {
      injectStyles(css, { namespace, ...options });
    },
    [namespace]
  );
  const remove = React4.useCallback(
    (id = "default") => {
      removeStyles(namespace, id);
    },
    [namespace]
  );
  const injectIsolationStyles = React4.useCallback(() => {
    const css = generateIsolationCSS(namespace);
    inject(css, { id: "isolation", priority: -1 });
  }, [namespace, inject]);
  return {
    inject,
    remove,
    injectIsolationStyles
  };
}

// src/components/theme/with-style-isolation.tsx
import { Fragment, jsx as jsx4 } from "react/jsx-runtime";
function withStyleIsolation(Component, options = {}) {
  const {
    namespace = "ds-ui",
    resetStyles = true,
    injectIsolationCSS = true,
    wrapperProps = {}
  } = options;
  const WrappedComponent = React5.forwardRef((props, ref) => {
    const { injectIsolationStyles } = useStyleInjection(namespace);
    React5.useEffect(() => {
      if (injectIsolationCSS) {
        injectIsolationStyles();
      }
    }, [injectIsolationStyles, injectIsolationCSS]);
    return /* @__PURE__ */ jsx4(
      StyleIsolationProvider,
      {
        namespace,
        resetStyles,
        ...wrapperProps,
        children: /* @__PURE__ */ jsx4(Component, { ...props })
      }
    );
  });
  WrappedComponent.displayName = `withStyleIsolation(${Component.displayName || Component.name})`;
  return WrappedComponent;
}
function useStyleIsolationSafe() {
  try {
    return useStyleIsolation();
  } catch {
    return {
      theme: "light",
      namespace: "ds-ui",
      cssVariables: {}
    };
  }
}
function EnsureStyleIsolation({
  children,
  fallbackProps = {}
}) {
  const context = useStyleIsolationSafe();
  const hasContext = context.namespace !== "ds-ui" || context.theme !== "light";
  if (hasContext) {
    return /* @__PURE__ */ jsx4(Fragment, { children });
  }
  return /* @__PURE__ */ jsx4(
    StyleIsolationProvider,
    {
      namespace: fallbackProps.namespace || "ds-ui",
      resetStyles: fallbackProps.resetStyles !== false,
      ...fallbackProps.wrapperProps,
      children
    }
  );
}

// src/components/theme/design-system-root.tsx
import * as React6 from "react";

// src/hooks/use-next-themes-integration.ts
import { useEffect as useEffect3, useState as useState2 } from "react";
function useNextThemesIntegration() {
  const [theme, setTheme] = useState2("light");
  const [mounted, setMounted] = useState2(false);
  useEffect3(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const nextThemesScript = document.querySelector("script[data-theme]");
      if (nextThemesScript) {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark" || storedTheme === "light") {
          setTheme(storedTheme);
        } else {
          const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          setTheme(prefersDark ? "dark" : "light");
        }
      } else {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains("dark")) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }
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
        attributeFilter: ["class"]
      });
      const handleStorageChange = (e) => {
        if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
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
    mounted
  };
}
function useDesignSystemTheme() {
  const { theme } = useNextThemesIntegration();
  return theme;
}

// src/components/theme/design-system-root.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var DesignSystemRoot = React6.forwardRef(({ theme: explicitTheme, autoDetectTheme = true, ...props }, ref) => {
  const detectedTheme = useDesignSystemTheme();
  const currentTheme = explicitTheme || (autoDetectTheme ? detectedTheme : "light");
  return /* @__PURE__ */ jsx5(StyleIsolationProvider, { ref, theme: currentTheme, ...props });
});
DesignSystemRoot.displayName = "DesignSystemRoot";
export {
  Button,
  DesignSystemProvider,
  DesignSystemRoot,
  EnsureStyleIsolation,
  StyleIsolationProvider,
  cn,
  generateIsolationCSS,
  injectStyles,
  removeStyles,
  useDesignSystemTheme,
  useNextThemesIntegration,
  useStyleInjection,
  useStyleIsolation,
  useStyleIsolationSafe,
  withStyleIsolation
};
//# sourceMappingURL=index.mjs.map