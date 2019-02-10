module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer', {
        preset: 'angular',
        releaseRules: [
          {
            type: 'refactor',
            release: 'patch'
          },
          {
            type: 'docs',
            release: 'patch'
          },
        ]
      }
    ],
      '@semantic-release/release-notes-generator',
    [
      '@semantic-release/git', {
        assets: [
          'package.json',
        ],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
