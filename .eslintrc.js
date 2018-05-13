module.exports = {
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { singleQuote: true }],
    "linebreak-style": ["error", "windows"]
  },
  extends: ["airbnb-base", "prettier"]
};
