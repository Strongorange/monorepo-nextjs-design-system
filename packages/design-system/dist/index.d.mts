import * as React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
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

interface WithStyleIsolationOptions {
    namespace?: string;
    resetStyles?: boolean;
    injectIsolationCSS?: boolean;
    wrapperProps?: Partial<StyleIsolationProviderProps>;
}
/**
 * Higher-order component that wraps a component with style isolation
 */
declare function withStyleIsolation<P extends object>(Component: React.ComponentType<P>, options?: WithStyleIsolationOptions): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<any>>;
/**
 * Hook to access style isolation context with error boundary
 */
declare function useStyleIsolationSafe(): StyleIsolationContextValue;
/**
 * Component that ensures style isolation is available
 */
interface EnsureStyleIsolationProps {
    children: React.ReactNode;
    fallbackProps?: WithStyleIsolationOptions;
}
declare function EnsureStyleIsolation({ children, fallbackProps, }: EnsureStyleIsolationProps): react_jsx_runtime.JSX.Element;

/**
 * Convenient wrapper component that combines StyleIsolationProvider with theme detection
 * This is the recommended way to use the design system in consumer applications
 */

interface DesignSystemRootProps extends Omit<StyleIsolationProviderProps, "theme"> {
    /**
     * Override theme detection with explicit theme
     * If not provided, will automatically detect from next-themes or document class
     */
    theme?: "light" | "dark";
    /**
     * Whether to automatically detect theme changes
     * @default true
     */
    autoDetectTheme?: boolean;
}
/**
 * Root component for the design system
 * Automatically handles theme detection and style isolation
 *
 * Usage:
 * ```tsx
 * // Automatic theme detection (recommended)
 * <DesignSystemRoot>
 *   <Button>Click me</Button>
 * </DesignSystemRoot>
 *
 * // Manual theme control
 * <DesignSystemRoot theme="dark">
 *   <Button>Click me</Button>
 * </DesignSystemRoot>
 * ```
 */
declare const DesignSystemRoot: React.ForwardRefExoticComponent<DesignSystemRootProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Hook to get current theme from next-themes
 * Falls back gracefully if next-themes is not available
 */
declare function useNextThemesIntegration(): {
    theme: "light" | "dark";
    mounted: boolean;
};
/**
 * Simple hook that returns the current theme for StyleIsolationProvider
 * Use this when you want automatic theme detection
 */
declare function useDesignSystemTheme(): "light" | "dark";

declare function cn(...inputs: ClassValue[]): string;

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
declare function injectStyles(css: string, options: StyleInjectionOptions): void;
/**
 * Removes injected styles
 */
declare function removeStyles(namespace: string, id?: string): void;
/**
 * Generates CSS for style isolation
 */
declare function generateIsolationCSS(namespace: string): string;
/**
 * Hook for managing dynamic style injection
 */
declare function useStyleInjection(namespace: string): {
    inject: (css: string, options?: Omit<StyleInjectionOptions, "namespace">) => void;
    remove: (id?: string) => void;
    injectIsolationStyles: () => void;
};

export { Button, type ButtonProps, DesignSystemProvider, type DesignSystemProviderProps, DesignSystemRoot, type DesignSystemRootProps, type DesignSystemTheme, EnsureStyleIsolation, StyleIsolationProvider, type StyleIsolationProviderProps, type StyleIsolationTheme, cn, generateIsolationCSS, injectStyles, removeStyles, useDesignSystemTheme, useNextThemesIntegration, useStyleInjection, useStyleIsolation, useStyleIsolationSafe, withStyleIsolation };
