module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "max-len": "off", // Often too restrictive for function logic
    "require-jsdoc": "off", // Not necessary for this project's style
    "valid-jsdoc": "off",
  },
};
