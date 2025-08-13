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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
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
export {
  Button,
  DesignSystemProvider,
  cn
};
//# sourceMappingURL=index.mjs.map