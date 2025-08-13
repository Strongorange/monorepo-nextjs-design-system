// packages/design-system/tailwind.config.js
const designSystemConfig = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--ds-border))",
        input: "hsl(var(--ds-input))",
        ring: "hsl(var(--ds-ring))",
        background: "hsl(var(--ds-background))",
        foreground: "hsl(var(--ds-foreground))",
        primary: {
          DEFAULT: "hsl(var(--ds-primary))",
          foreground: "hsl(var(--ds-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--ds-secondary))",
          foreground: "hsl(var(--ds-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--ds-destructive))",
          foreground: "hsl(var(--ds-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--ds-muted))",
          foreground: "hsl(var(--ds-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--ds-accent))",
          foreground: "hsl(var(--ds-accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--ds-radius)",
        md: "calc(var(--ds-radius) - 2px)",
        sm: "calc(var(--ds-radius) - 4px)",
      },
    },
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/ui/**/*.{ts,tsx}"],
  ...designSystemConfig,
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};

// 설정을 외부에서 사용할 수 있도록 내보내기
module.exports.designSystemConfig = designSystemConfig;
