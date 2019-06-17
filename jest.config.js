module.exports = {
  collectCoverageFrom: [
    'src/{**/,}*.js',
  ],

  setupFiles: [
    'jest-canvas-mock',
  ],

  clearMocks: true,

  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: -10,
    },
  },
};
