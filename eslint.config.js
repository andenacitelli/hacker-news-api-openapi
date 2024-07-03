import js from "@eslint/js";
import ts_eslint from "typescript-eslint";

/** @type {import('eslint').Linter.FlatConfig[]} */
const GLOBAL_RULES = [
  {
    ignores: [
      "**/.*", // hidden files
    ],
  },
];

/** @type {import('eslint').Linter.FlatConfig[]} */
const LANGUAGE_CONFIGS = [
  // Configuration presets scoped to just languages
  js.configs.recommended,
  ...ts_eslint.configs.recommended,
];

/** @type {import('eslint').Linter.FlatConfig[]} */
const LIBRARY_CONFIGS = [];

/** @type {import('eslint').Linter.FlatConfig[]} */
const DIRECTORY_CONFIGS = [];

/** @type {import('eslint').Linter.FlatConfig[]} */
const result = [
  // Order-sensitive. Later configs merge configs with earlier ones, but take precedence in case of.
  ...GLOBAL_RULES,
  ...LANGUAGE_CONFIGS,
  ...LIBRARY_CONFIGS,
  ...DIRECTORY_CONFIGS,
];
export default result;
