import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const dsButtonVariants = cva(
  "font-pretendard rounded-small-desktop box-border inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      appearance: {
        fill: "",
        outline: "bg-material-button-white border focus:font-bold",
        text: "rounded-md bg-transparent px-0 py-1",
      },
      intent: {
        primary: "",
        assistive: "",
        secondary: "",
      },
      size: {
        small: "px-small h-[32px] py-0 font-semibold",
        medium: "px-small h-[40px] py-0 font-bold",
        large: "px-medium h-[48px] py-0 font-bold",
        xlarge: "px-large h-[56px] py-0 font-bold",
      },
      fullWidth: {
        true: "flex w-full",
        false: "w-fit",
      },
    },
    // 여러 Variant의 조합일때 정용될 스타일 정의
    compoundVariants: [
      // Fill 버튼
      {
        appearance: "fill",
        intent: "primary",
        className:
          "bg-material-button-brand text-material-label-white-strong shadow-xs hover:bg-material-button-brand-hover disabled:bg-material-button-brand-disable disabled:text-material-label-black-disabled disabled:hover:bg-material-button-brand-disable/30",
      },
      {
        appearance: "fill",
        intent: "assistive",
        className:
          "bg-material-button-black text-material-label-white-strong shadow-xs hover:bg-material-button-black-hover disabled:bg-material-button-black-disable disabled:text-material-label-black-disabled disabled:hover:bg-material-button-black-disable/30",
      },
      // Outline 버튼
      {
        appearance: "outline",
        intent: "primary",
        className:
          "text-brand-primary-normal disabled:text-material-label-black-disabled disabled:border-material-border-normal border-brand-primary-normal focus:bg-brand-primary-normal focus:text-material-label-white-normal",
      },
      {
        appearance: "outline",
        intent: "secondary",
        className:
          "border-material-border-normal text-material-label-black-strong disabled:text-material-label-black-disabled focus:border-material-border-focused",
      },
      {
        appearance: "outline",
        intent: "assistive",
        // TODO: 여기 딱 바꿔야함, Text  Focus 상태에서
        className:
          "focus:bg-material-button-black text-material-label-black-strong rounded-xlarge-mobile border-material-border-normal hover:border-material-border-focused disabled:text-material-label-black-disabled",
      },
      // Text 버튼
      {
        appearance: "text",
        intent: "primary",
        className:
          "hover:bg-muted focus:bg-muted text-[var(--color-ds-neutral-800)]",
      },
    ],
    defaultVariants: {
      appearance: "fill",
      intent: "primary",
      size: "medium",
      fullWidth: false,
    },
  }
);

export type DsButtonAppearance = "fill" | "outline" | "text";
export type DsButtonIntent = "primary" | "secondary" | "assistive";
export type DsButtonSize = "medium" | "small" | "large" | "xlarge";

export type DsButtonVariantProps = VariantProps<typeof dsButtonVariants>;

export interface DsButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  asChild?: boolean;
  appearance?: DsButtonAppearance;
  intent?: DsButtonIntent;
  size?: DsButtonSize;
  fullWidth?: boolean;
}

const DsButton = React.forwardRef<HTMLButtonElement, DsButtonProps>(
  (
    {
      className,
      appearance = "fill",
      intent = "primary",
      size,
      asChild = false,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        data-slot="button"
        className={cn(
          dsButtonVariants({
            appearance,
            intent,
            size,
            className,
            fullWidth,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
DsButton.displayName = "DsButton";

export { DsButton, dsButtonVariants };
