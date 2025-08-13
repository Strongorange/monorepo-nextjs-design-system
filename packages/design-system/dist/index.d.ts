import * as React from 'react';
import { ClassValue } from 'clsx';

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

type DesignSystemTheme = "light" | "dark" | "inherit";
interface DesignSystemProviderProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean;
    theme?: DesignSystemTheme;
}
declare const DesignSystemProvider: React.ForwardRefExoticComponent<DesignSystemProviderProps & React.RefAttributes<HTMLDivElement>>;

declare function cn(...inputs: ClassValue[]): string;

export { Button, type ButtonProps, DesignSystemProvider, type DesignSystemProviderProps, type DesignSystemTheme, cn };
