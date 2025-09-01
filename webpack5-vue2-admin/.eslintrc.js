module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: ["plugin:vue/recommended", "eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    parser: "@babel/eslint-parser"
  },
  rules: {
    // "off" 或 0 - 关闭规则
    // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    "no-empty": 0,
    "no-redeclare": 0,
    "no-unused-vars": 0,
    "no-self-assign": 0,
    "vue/order-in-components": 0,
    // 关闭组件属性连字符
    "vue/attribute-hyphenation": 0,
    // 关闭组件name大小写
    "vue/component-definition-name-casing": 0
  }
};
