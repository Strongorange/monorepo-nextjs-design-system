const {
  postcssNamespacePlugin,
  postcssResetPlugin,
  postcssCSSVariablePlugin,
  postcssSpecificityBoosterPlugin,
  postcssOpacityModifierPlugin,
} = require("./build/postcss-plugins");
const buildConfig = require("./build/config");

module.exports = {
  plugins: [
    // First, process Tailwind CSS
    require("tailwindcss"),

    // Handle CSS variables scoping
    postcssCSSVariablePlugin({
      namespace: buildConfig.namespace,
      variablePrefix: buildConfig.cssVariablePrefix,
    }),

    // Add namespace to all selectors
    postcssNamespacePlugin({
      namespace: buildConfig.namespace,
      specificityLevel: buildConfig.specificityLevel,
      useImportant: buildConfig.useImportant,
    }),

    // Boost specificity through selector chaining
    postcssSpecificityBoosterPlugin({
      namespace: buildConfig.namespace,
      specificityLevel: buildConfig.specificityLevel,
    }),

    // Add scoped reset styles
    postcssResetPlugin({
      namespace: buildConfig.namespace,
      includeDefensiveStyles: true,
    }),

    // Add missing opacity modifier classes
    postcssOpacityModifierPlugin({
      namespace: buildConfig.namespace,
    }),

    // Finally, add vendor prefixes
    require("autoprefixer"),
  ],
};
