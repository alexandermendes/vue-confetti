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
          {
            type: 'build',
            release: 'patch'
          },
          {
            type: 'ci',
            release: 'patch'
          },
        ]
      }
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
    [
      '@semantic-release/git', {
        assets: [
          'package.json',
          'package-lock.json'
        ],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
