module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  rules: {
    "no-var": 1,
    "no-debugger": 0,
    "array-callback-return": [2],
    "react-refresh/only-export-components": ["off", { allowConstantExport: true }],
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-unused-vars": 2,
    "@typescript-eslint/no-var-requires": 2,
    quotes: [2, "double", { allowTemplateLiterals: true }],
    eqeqeq: 2, // 要求使用 === 和 !==
    "no-empty": 2, // 块语句中的内容不能为空
    "no-empty-character-class": 2, // 正则表达式中的[]内容不能为空
    "no-extra-boolean-cast": 2, // 禁止不必要的bool转换
    "no-extra-parens": 0, // 禁止非必要的括号
    "no-irregular-whitespace": 2, // 不能有不规则的空格
    "no-self-assign": 2, // 禁止自我赋值
    "no-self-compare": 2, // 禁止自身比较
    "no-sequences": 2, // 禁用逗号操作符
    "no-unmodified-loop-condition": 2, // 禁用一成不变的循环条件
    "no-unused-expressions": 0, // 禁止出现未使用过的表达式
    "object-curly-spacing": [2, "always"], // 对象前后需要空格
    "callback-return": 0, // 避免多次调用回调
    "react/self-closing-comp": [
      2,
      {
        component: true,
        html: true,
      },
    ],
    "react/react-in-jsx-scope": 0,
    "react/jsx-no-undef": [2, { allowGlobals: true }],
    "react-hooks/exhaustive-deps": [0],
    "react/no-array-index-key": [0],
    "@typescript-eslint/triple-slash-reference": 0,
    //推荐使用isNaN方法，而不要直接和NaN作比较
    "use-isnan": 2,
    "object-curly-newline": [
      0,
      {
        minProperties: 3,
      },
    ],
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/no-empty-object-type": 1,
  },
};
