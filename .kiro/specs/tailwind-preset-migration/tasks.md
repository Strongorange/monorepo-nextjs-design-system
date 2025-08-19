# Implementation Plan

- [x] 1. Create Tailwind Preset file

  - Create `packages/design-system/tailwind.preset.js` with all design tokens
  - Export theme configuration with CSS variables mapping
  - Include colors, borderRadius, and other design tokens from existing config
  - _Requirements: 1.1, 1.2, 3.1, 3.2_

- [x] 2. Update package.json exports

  - Add `"./tailwind.preset": "./tailwind.preset.js"` to exports
  - Remove `"./styles.isolated"` and `"./tailwind.config"` exports
  - Update files array to include preset file
  - _Requirements: 1.3, 4.1_

- [x] 3. Simplify Button component

  - Remove `ds-ui ds-ui ds-ui ds-ui ds-ui` specificity hack from Button className
  - Remove `ds-Button` class from Button component
  - Keep only clean `cn(buttonVariants({ variant, size, className }))`
  - _Requirements: 2.1, 2.2, 2.3, 4.2_

- [x] 4. Remove StyleIsolationProvider from exports

  - Remove StyleIsolationProvider and related exports from `src/index.ts`
  - Keep only Button component and utils exports for MVP
  - _Requirements: 4.2, 6.1, 6.3_

- [x] 5. Simplify styles.css file

  - Remove complex CSS processing directives
  - Keep only `@tailwind` directives and CSS variables
  - Maintain existing CSS variable values for consistency
  - _Requirements: 3.1, 3.2, 4.1_

- [x] 6. Simplify PostCSS configuration

  - Replace complex postcss.config.js with basic Tailwind + Autoprefixer
  - Remove all custom PostCSS plugins
  - _Requirements: 4.1, 4.3_

- [x] 7. Simplify tsup build configuration

  - Remove complex CSS processing pipeline from tsup.config.ts
  - Keep only basic TypeScript compilation and CSS copying
  - _Requirements: 4.3_

- [x] 8. Install Tailwind in frontend-a consumer app

  - Add tailwindcss dependency to `apps/frontend-a/package.json`
  - Install required Tailwind packages
  - _Requirements: 5.1_

- [x] 9. Configure Tailwind in frontend-a

  - Update `apps/frontend-a/tailwind.config.js` to use design system preset
  - Add correct content paths including node_modules
  - _Requirements: 5.1, 5.2_

- [x] 10. Add CSS imports to frontend-a

  - Create `apps/frontend-a/src/app/globals.css` with Tailwind directives
  - Import design system styles in globals.css
  - Update layout.tsx to import globals.css
  - _Requirements: 5.2_

- [x] 11. Test Button component rendering

  - Verify all Button variants render correctly in frontend-a
  - Test all Button sizes render correctly
  - Verify hover states work properly
  - _Requirements: 2.1, 2.2, 2.3, 6.4_

- [x] 12. Verify build processes
  - Build design system package successfully
  - Build frontend-a consumer app successfully
  - Verify final CSS contains only necessary classes
  - _Requirements: 4.3, 5.3_
