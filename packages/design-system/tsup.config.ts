import { defineConfig } from "tsup";
import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
  banner: {
    js: '"use client";',
  },
  onSuccess: async () => {
    console.log("🎨 Starting CSS processing pipeline...");

    try {
      // Verify required files exist
      const stylesInput = "src/styles.css";
      const postcssConfig = "postcss.config.js";

      if (!existsSync(stylesInput)) {
        throw new Error(`Input CSS file not found: ${stylesInput}`);
      }

      if (!existsSync(postcssConfig)) {
        throw new Error(`PostCSS config not found: ${postcssConfig}`);
      }

      // Process CSS with PostCSS pipeline
      // This applies namespace isolation, specificity boosting, and scoped reset
      console.log("  📦 Compiling Tailwind CSS...");
      console.log("  🏷️  Applying namespace isolation...");
      console.log("  ⚡ Boosting CSS specificity...");
      console.log("  🛡️  Adding scoped reset styles...");

      execSync(`postcss ${stylesInput} -o dist/styles.css --verbose`, {
        stdio: "inherit",
      });

      // Verify output was created
      if (!existsSync("dist/styles.css")) {
        throw new Error("CSS output file was not created");
      }

      console.log("✅ CSS processing pipeline completed successfully");
      console.log("   📄 Generated: dist/styles.css (isolated & namespaced)");
    } catch (error) {
      console.error("❌ CSS processing pipeline failed:");
      console.error(`   Error: ${error.message}`);
      console.error(
        "   Please check your PostCSS configuration and input files"
      );
      throw error;
    }
  },
});
