import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const dsButtonVariants = cva(
  "font-pretendard focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export type DsButtonVariant = 'primary' | 'secondary' | 'destructive';

export type DsButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export type DsButtonVariantProps = VariantProps<typeof dsButtonVariants>;

export interface DsButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  asChild?: boolean;
  variant?: DsButtonVariant;
  size?: DsButtonSize;
}

// export interface DsButtonProps
//   extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
//     DsButtonVariantProps {
//   asChild?: boolean;
// }

const DsButton = React.forwardRef<HTMLButtonElement, DsButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        data-slot="button"
        className={cn(dsButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
DsButton.displayName = 'DsButton';

export { DsButton, dsButtonVariants };
