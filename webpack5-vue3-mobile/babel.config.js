module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: 3,
        useBuiltIns: "entry",
      },
    ],
    [
      "@babel/preset-typescript",
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { version: "legacy" }],
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-transform-object-rest-spread",
  ],
  sourceType: "unambiguous",
};
