/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        border: "var(--ds-border)",
        input: "var(--ds-input)",
        ring: "var(--ds-ring)",
        background: "var(--ds-background)",
        foreground: "var(--ds-foreground)",
        primary: {
          DEFAULT: "var(--ds-primary)",
          foreground: "var(--ds-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--ds-secondary)",
          foreground: "var(--ds-secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--ds-destructive)",
          foreground: "var(--ds-destructive-foreground)",
        },
        success: {
          DEFAULT: "var(--ds-success)",
          foreground: "var(--ds-success-foreground)",
        },
        warning: {
          DEFAULT: "var(--ds-warning)",
          foreground: "var(--ds-warning-foreground)",
        },
        disabled: "var(--ds-disabled-foreground)",
        muted: {
          DEFAULT: "var(--ds-muted)",
          foreground: "var(--ds-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--ds-accent)",
          foreground: "var(--ds-accent-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--ds-radius)",
        md: "calc(var(--ds-radius) - 2px)",
        sm: "calc(var(--ds-radius) - 4px)",
      },
    },
  },
  plugins: [],
};
