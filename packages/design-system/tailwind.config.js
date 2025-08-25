const designSystemConfig = {
  important: true,
  theme: {
    extend: {
      colors: {
        /* 피그마 컬러 시맨틱 Brand Primary */
        "brand-primary": {
          normal: "var(--color-semantic-brand-primary-normal)",
          strong: "var(--color-semantic-brand-primary-strong)",
          heavy: "var(--color-semantic-brand-primary-heavy)",
          bw: "var(--color-semantic-brand-primary-bw)",
        },

        /* 피그마 컬러 시맨틱 Material */
        material: {
          label: {
            black: {
              strong: "var(--color-semantic-material-label-black-strong)",
              normal: "var(--color-semantic-material-label-black-normal)",
              neutral: "var(--color-semantic-material-label-black-neutral)",
              disabled: "var(--color-semantic-material-label-black-disabled)",
            },
            white: {
              strong: "var(--color-semantic-material-label-white-strong)",
              normal: "var(--color-semantic-material-label-white-normal)",
              neutral: "var(--color-semantic-material-label-white-neutral)",
              disabled: "var(--color-semantic-material-label-white-disabled)",
            },
          },
          fill: {
            weak: "var(--color-semantic-fill-weak)",
            normal: "var(--color-semantic-fill-normal)",
            strong: "var(--color-semantic-fill-strong)",
            deep: "var(--color-semantic-fill-deep)",
          },
          button: {
            brand: {
              DEFAULT: "var(--color-semantic-material-button-brand-default)",
              hover: "var(--color-semantic-material-button-brand-hover)",
              focus: "var(--color-semantic-material-button-brand-focus)",
              disable: "var(--color-semantic-material-button-brand-disable)",
            },
            black: {
              DEFAULT: "var(--color-semantic-material-button-black-default)",
              hover: "var(--color-semantic-material-button-black-hover)",
              focus: "var(--color-semantic-material-button-black-focus)",
              disable: "var(--color-semantic-material-button-black-disable)",
            },
            white: {
              DEFAULT: "var(--color-semantic-material-button-white-default)",
              hover: "var(--color-semantic-material-button-white-hover)",
              focus: "var(--color-semantic-material-button-white-focus)",
              disable: "var(--color-semantic-material-button-white-disable)",
            },
          },
          border: {
            weak: "var(--color-semantic-material-border-weak)",
            normal: "var(--color-semantic-material-border-normal)",
            strong: "var(--color-semantic-material-border-strong)",
            focused: "var(--color-semantic-material-border-focused)",
          },
        },
      },
      fontFamily: {
        pretendard: [
          "Pretendard Variable",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "'Noto Sans KR'",
          "sans-serif",
          "'Apple Color Emoji'",
          "'Segoe UI Emoji'",
          "'Segoe UI Symbol'",
          "'Noto Color Emoji'",
        ],
      },
      borderRadius: {
        lg: "var(--ds-radius)",
        md: "calc(var(--ds-radius) - 2px)",
        sm: "calc(var(--ds-radius) - 4px)",
      },
      spacing: {
        "3x-large": "64px",
        "2x-large": "32px",
        "x-large": "24px",
        large: "20px",
        medium: "16px",
        small: "12px",
        "x-small": "8px",
        "2x-small": "4px",
        "3x-small": "2px",
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
  // safelist: [
  //   // Ensure opacity modifier classes are included
  //   "hover:bg-primary/90",
  //   "hover:bg-destructive/90",
  //   "hover:bg-secondary/80",
  //   // Add other opacity modifiers that might be used
  //   "bg-primary/90",
  //   "bg-destructive/90",
  //   "bg-secondary/80",
  //   "bg-accent/90",
  //   "text-primary/90",
  //   "text-destructive/90",
  //   "border-primary/90",
  //   // Add pattern-based safelist for opacity modifiers
  //   {
  //     pattern: /bg-(primary|secondary|destructive|accent)\/\d+/,
  //     variants: ["hover", "focus", "active"],
  //   },
  //   {
  //     pattern: /text-(primary|secondary|destructive|accent)-foreground/,
  //     variants: ["hover", "focus", "active"],
  //   },
  // ],
};

// 설정을 외부에서 사용할 수 있도록 내보내기
module.exports.designSystemConfig = designSystemConfig;
