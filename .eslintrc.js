module.exports = {
  parser: "babel-eslint",
  extends: [
    "react-app",
    // extends the prettier config (disables base eslint rules so they don't conflict with prettier)
    // enables the prettier plugin (enables eslint detecting prettier errors)
    // sets the "prettier/prettier" rule to "error" (enables red-highlighting of prettier errors)
    "plugin:prettier/recommended",
    // further disable linting rules from @typescript-eslint so that prettier can handle them
    "prettier/@typescript-eslint",
    // further disable linting rules from react
    "prettier/react",
  ],
  plugins: [
    "react",
    "react-hooks",
    // accessibility linting for jsx
    "jsx-a11y",
    // better linting for ES6 import statements
    "import",
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
}
