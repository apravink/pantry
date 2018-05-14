module.exports = {
  plugins: ["prettier"],
  rules: {
    avoidEscape: true,
    "prettier/prettier": ["error", { singleQuote: true }],
    "linebreak-style": ["error", "windows"]
  },
  extends: ["airbnb-base", "prettier"]
};
