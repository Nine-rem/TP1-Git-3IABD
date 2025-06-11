// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import { FlatCompat } from "eslint/eslintrc";  // <-- bien depuis 'eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

export default defineConfig([
  {
    // Recommandations de @eslint/js pour tous les fichiers JS
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    // Mode CommonJS pour les .js uniquement
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    // Globals du navigateur pour .js/.mjs/.cjs
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
  // Injecte la config airbnb-base legacy via FlatCompat
  ...compat.extends("airbnb-base"),
  {
    // Vos règles perso
    rules: {
      "no-console": "warn",
      indent: ["error", 2],
      quotes: ["error", "single"],
    },
    env: {
      browser: true,
      node: true,
    },
  },
]);
