import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

export type DesignSystemTheme = "light" | "dark" | "inherit";

export interface DesignSystemProviderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  theme?: DesignSystemTheme;
}

export const DesignSystemProvider = React.forwardRef<
  HTMLDivElement,
  DesignSystemProviderProps
>(({ asChild = false, theme = "inherit", className, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  const darkClassName =
    theme === "dark" ? "dark" : theme === "light" ? undefined : undefined;

  return (
    <Comp
      data-ds-theme
      className={cn(darkClassName, className)}
      ref={ref as any}
      {...props}
    />
  );
});

DesignSystemProvider.displayName = "DesignSystemProvider";
