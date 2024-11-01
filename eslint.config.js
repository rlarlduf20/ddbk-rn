/* eslint-disable */

const js = require("@eslint/js");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const reactPlugin = require("eslint-plugin-react");
const reactNativePlugin = require("eslint-plugin-react-native");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        React: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      react: reactPlugin,
      "react-native": reactNativePlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".jsx", ".tsx"] },
      ],
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
];
