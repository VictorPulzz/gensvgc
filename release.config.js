const config = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    [
      "@semantic-release/changelog",
      {
        "changelogFile":"CHANGELOG.md"
      }
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        "assets": [
          "./CHANGELOG.md",
          "./package.json",
          "./package-lock.json"
        ],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    "@semantic-release/github",
  ]
}

module.exports = config;
