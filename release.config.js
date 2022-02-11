module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/npm',
    '@semantic-release/changelog',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/git',
  ],
};
