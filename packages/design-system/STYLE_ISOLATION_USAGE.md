# Style Isolation Provider Usage Guide

## Overview

The `StyleIsolationProvider` is a React component that provides CSS variable injection and namespace isolation for design system components. It focuses purely on style isolation while delegating theme management to external providers like `next-themes`.

## Basic Usage

### Simple Usage

```tsx
import { StyleIsolationProvider, Button } from "@strongorange/ds-ui";

function App() {
  return (
    <StyleIsolationProvider>
      <Button>Click me</Button>
    </StyleIsolationProvider>
  );
}
```

### With Custom Theme

```tsx
import { StyleIsolationProvider, Button } from "@strongorange/ds-ui";

function App() {
  return (
    <StyleIsolationProvider theme="dark">
      <Button>Dark themed button</Button>
    </StyleIsolationProvider>
  );
}
```

### With Custom Namespace

```tsx
import { StyleIsolationProvider, Button } from "@strongorange/ds-ui";

function App() {
  return (
    <StyleIsolationProvider namespace="my-app-ds">
      <Button>Namespaced button</Button>
    </StyleIsolationProvider>
  );
}
```

## Integration with Next.js and next-themes

The provider automatically detects theme changes from `next-themes` by watching for class changes on the document element:

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";
import { StyleIsolationProvider } from "@strongorange/ds-ui";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider attribute="class">
          <StyleIsolationProvider>{children}</StyleIsolationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Advanced Usage

### Using the Context Hook

```tsx
import { useStyleIsolation } from "@strongorange/ds-ui";

function MyComponent() {
  const { theme, namespace, cssVariables } = useStyleIsolation();

  return (
    <div style={{ color: cssVariables["--ds-primary"] }}>
      Current theme: {theme}
      Namespace: {namespace}
    </div>
  );
}
```

### Higher-Order Component

```tsx
import { withStyleIsolation } from "@strongorange/ds-ui";

const MyComponent = ({ title }) => <h1>{title}</h1>;

const IsolatedComponent = withStyleIsolation(MyComponent, {
  namespace: "my-component",
  resetStyles: true,
});
```

### Ensuring Style Isolation

```tsx
import { EnsureStyleIsolation, Button } from "@strongorange/ds-ui";

function SomeComponent() {
  return (
    <EnsureStyleIsolation>
      {/* This will be wrapped with StyleIsolationProvider if not already present */}
      <Button>Safe button</Button>
    </EnsureStyleIsolation>
  );
}
```

## Dynamic Style Injection

```tsx
import { useStyleInjection } from "@strongorange/ds-ui";

function CustomComponent() {
  const { inject, remove } = useStyleInjection("my-namespace");

  React.useEffect(() => {
    inject(
      `
      .my-custom-class {
        color: var(--ds-primary);
        background: var(--ds-background);
      }
    `,
      { id: "custom-styles" }
    );

    return () => remove("custom-styles");
  }, [inject, remove]);

  return <div className="my-custom-class">Custom styled content</div>;
}
```

## Props Reference

### StyleIsolationProvider Props

| Prop          | Type                | Default     | Description                                                             |
| ------------- | ------------------- | ----------- | ----------------------------------------------------------------------- |
| `theme`       | `"light" \| "dark"` | `undefined` | Explicit theme override. If not provided, detects from document classes |
| `namespace`   | `string`            | `"ds-ui"`   | CSS namespace for isolation                                             |
| `resetStyles` | `boolean`           | `true`      | Whether to apply reset styles                                           |
| `asChild`     | `boolean`           | `false`     | Render as child element using Radix Slot                                |
| `children`    | `ReactNode`         | -           | Child components                                                        |

## SSR Considerations

The provider is designed to work seamlessly with SSR:

- Initial render always uses "light" theme to prevent hydration mismatches
- Theme detection happens on the client side after hydration
- CSS variables are injected as inline styles for immediate availability

## CSS Variables Available

The provider injects the following CSS variables based on the current theme:

### Light Theme

- `--ds-background`: #fefefe
- `--ds-foreground`: #1e2022
- `--ds-primary`: #0172fe
- `--ds-secondary`: #fbfcfd
- `--ds-accent`: #a670eb
- `--ds-destructive`: #f83b68
- And more...

### Dark Theme

- `--ds-background`: #1e2022
- `--ds-foreground`: #ffffff
- `--ds-primary`: #0172fe
- `--ds-secondary`: #3d4044
- `--ds-accent`: #977aec
- `--ds-destructive`: #f83b68
- And more...

## Best Practices

1. **Use at the root level**: Place the provider as high as possible in your component tree
2. **Single provider per app**: Avoid nesting multiple providers unless you need different namespaces
3. **Let external libraries handle theme**: Use `next-themes` or similar for theme management
4. **Custom namespaces for isolation**: Use different namespaces when embedding in third-party applications
5. **Reset styles carefully**: Disable reset styles if they conflict with your existing CSS
