module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    "import/prefer-default-export": "off",
    "max-len": ["error", {
      "code": 100,
      "ignoreComments": true
    }]
  },
  plugins: ["jest"]
};
