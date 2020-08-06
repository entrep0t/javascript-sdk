module.exports = {
  extends: ['@poool/eslint-config'],
  globals: {
    btoa: false,
    fetch: false,
  },
  overrides: [{
    files: ['tests/**/*.js'],
    env: {
      jest: true,
    },
  }],
};
