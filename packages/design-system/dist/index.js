"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  StyleIsolationProvider: () => StyleIsolationProvider,
  cn: () => cn,
  useStyleIsolation: () => useStyleIsolation
});
module.exports = __toCommonJS(index_exports);

// src/components/ui/button.tsx
var React = __toESM(require("react"));
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/ui/button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)(
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
    const Comp = asChild ? import_react_slot.Slot : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Comp,
      {
        className: cn(
          "ds-ui ds-ui ds-ui ds-ui ds-ui",
          // 매우 높은 특이성을 위해 5번 반복
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

// src/components/theme/style-isolation-provider.tsx
var React2 = __toESM(require("react"));
var import_react_slot2 = require("@radix-ui/react-slot");
var import_jsx_runtime2 = require("react/jsx-runtime");
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
var StyleIsolationContext = React2.createContext(null);
function useStyleIsolation() {
  const context = React2.useContext(StyleIsolationContext);
  if (!context) {
    throw new Error(
      "useStyleIsolation must be used within a StyleIsolationProvider"
    );
  }
  return context;
}
function useCurrentTheme(providedTheme) {
  const [currentTheme, setCurrentTheme] = React2.useState("light");
  React2.useEffect(() => {
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
var StyleIsolationProvider = React2.forwardRef(
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
    const Comp = asChild ? import_react_slot2.Slot : "div";
    const currentTheme = useCurrentTheme(theme);
    const cssVariables = React2.useMemo(() => {
      return CSS_VARIABLES[currentTheme];
    }, [currentTheme]);
    const combinedStyle = React2.useMemo(() => {
      return {
        ...cssVariables,
        ...style
      };
    }, [cssVariables, style]);
    const contextValue = React2.useMemo(
      () => ({
        theme: currentTheme,
        namespace,
        cssVariables
      }),
      [currentTheme, namespace, cssVariables]
    );
    const isolationClasses = React2.useMemo(() => {
      const classes = [
        namespace,
        // Base namespace class required by compiled CSS (e.g., .ds-ui)
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
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StyleIsolationContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  StyleIsolationProvider,
  cn,
  useStyleIsolation
});
//# sourceMappingURL=index.js.map