import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  eslint.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      prettier: prettierPlugin,
      react: eslintPluginReact,
      "unused-imports": unusedImports,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      // "no-unused-vars": ["error", { args: "none", ignoreRestSiblings: true }], // Error on unused vars, but allow unused args
      // "no-unused-imports/no-unused-imports": "error", // Error on unused imports
      "no-multiple-empty-lines": ["warn", { max: 1 }], // Max 1 empty line
      "eol-last": ["warn", "always"], // Ensure newline at end of file
      quotes: ["warn", "double", { avoidEscape: true }], // Use double quotes, allow escaping
      semi: ["warn", "always"], // Require semicolons
      "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
