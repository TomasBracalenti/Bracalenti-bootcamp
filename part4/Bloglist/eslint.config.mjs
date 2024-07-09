import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"], 
    languageOptions: {sourceType: "commonjs"},
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
  },
  ignores: ["node_modules"],
  },
  {languageOptions: { globals: globals.node }},
];