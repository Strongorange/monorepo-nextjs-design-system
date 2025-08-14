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

declare function cn(...inputs: ClassValue[]): string;

type StyleIsolationTheme = "light" | "dark";
interface StyleIsolationContextValue {
    theme: StyleIsolationTheme;
    namespace: string;
    cssVariables: Record<string, string>;
}
interface StyleIsolationProviderProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean;
    theme?: StyleIsolationTheme;
    namespace?: string;
    resetStyles?: boolean;
    children: React.ReactNode;
}
/**
 * Hook to access style isolation context
 */
declare function useStyleIsolation(): StyleIsolationContextValue;
/**
 * Style Isolation Provider - focuses only on CSS variable injection and namespace isolation
 * Theme management is delegated to external providers like next-themes
 */
declare const StyleIsolationProvider: React.ForwardRefExoticComponent<StyleIsolationProviderProps & React.RefAttributes<HTMLDivElement>>;

export { Button, type ButtonProps, type ButtonSize, type ButtonVariant, StyleIsolationProvider, type StyleIsolationProviderProps, type StyleIsolationTheme, cn, useStyleIsolation };
