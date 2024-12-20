/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const prettierConfig = {
  printWidth: 100,
  semi: true,
  singleQuote: false,
  // 在唯一的箭头函数参数周围包含括号
  arrowParens: "always",
  // 设置对象两边元素留有空格
  bracketSpacing: true,
  // 属性一行一个
  singleAttributePerLine: true,
  cssUnitPrecision: "preserve",
  quoteProps: "as-needed",
};
export default prettierConfig;
