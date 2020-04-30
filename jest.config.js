module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
  ],
  timers: 'real',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
