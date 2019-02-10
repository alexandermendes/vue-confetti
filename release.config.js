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
    '@semantic-release/npm'
  ],
};
