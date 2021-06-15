module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    // Use recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:@typescript-eslint/recommended",
    // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors.
    // Make sure this is always the last configuration in the extends array.
    "plugin:prettier/recommended",
  ],
  env: {
    browser: false,
    amd: false,
    es6: true,
    node: true,
  },
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module", // allow use of imports
  },
  rules: {
    //extra
  },
  globals: {
    console: true,
  },
};
