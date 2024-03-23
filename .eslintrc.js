const config = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "plugin:jest-formatting/strict",
    "plugin:jest/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "unused-imports",
    "simple-import-sort",
    "prettier",
    "typescript-sort-keys",
    "jest",
    "jest-formatting"
  ],
  rules: {
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-use-before-define": "off",

    // typescript
    "@typescript-eslint/array-type": ["error", { default: "array" }],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/object-curly-spacing": ["error", "always"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // use optional chaining instead
    "@typescript-eslint/no-non-null-assertion": "error",

    "@typescript-eslint/naming-convention": "off",

    "@typescript-eslint/no-explicit-any": "off",

    "typescript-sort-keys/interface": [
      "error",
      "asc",
      { "caseSensitive": true, "natural": false, "requiredFirst": true }
    ],

    "no-plusplus": "off",
    "arrow-body-style": "off",
    "no-restricted-exports": "off",
    "no-nested-ternary": "off",

    // imports routine
    "sort-imports": "off",
    "import/order": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "unused-imports/no-unused-imports-ts": "error",

    "import/no-duplicates": "off",
    "import/no-cycle": "off",

    // allow only named exports for IDEs autocomplete
    "import/prefer-default-export": "off",
    "import/no-default-export": "off",

    "prefer-destructuring": "off",

    "prettier/prettier": "error",

    // immer uses reassign
    "no-param-reassign": "off",

    "max-classes-per-file": "off",

    "global-require": "off",

    "no-console": "warn",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};

module.exports = config;
