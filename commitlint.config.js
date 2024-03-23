// Commit structure by conventional commits:
// header: type(scope): subject
// body:
// footer:
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 300],
    "body-max-line-length": [2, "always", 1000],
    "subject-case": [2, "always", ["sentence-case"]],
    "type-enum": [
      2,
      "always",
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'refactor',
        'test',
      ],
    ],
  },
};

module.exports = config;
