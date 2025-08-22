import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const dsButtonVariants = cva(
  "font-pretendard focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive box-border inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-material-button-brand text-primary-foreground shadow-xs hover:bg-material-button-brand-hover",
        assistive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      },
      size: {
        small: "px-small h-[32px] py-0",
        medium: "px-small h-[40px] py-0",
        large: "px-medium h-[48px] py-0",
        xlarge: "px-large h-[56px] py-0",
      },
      fullWidth: {
        true: "flex w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      fullWidth: false,
    },
  }
);

export type DsButtonVariant = "primary" | "secondary" | "assistive";

export type DsButtonSize = "medium" | "small" | "large" | "xlarge";

export type DsButtonVariantProps = VariantProps<typeof dsButtonVariants>;

export interface DsButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  asChild?: boolean;
  variant?: DsButtonVariant;
  size?: DsButtonSize;
  fullWidth?: boolean;
}

const DsButton = React.forwardRef<HTMLButtonElement, DsButtonProps>(
  (
    { className, variant, size, asChild = false, fullWidth = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        data-slot="button"
        className={cn(
          dsButtonVariants({ variant, size, className, fullWidth })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
DsButton.displayName = "DsButton";

export { DsButton, dsButtonVariants };
