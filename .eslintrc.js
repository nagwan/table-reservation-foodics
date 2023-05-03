module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': 2,
    'no-use-before-define': 'off',
    'vue/component-tags-order': ['error', {
      order: ['script', 'template', 'style'],
    }],
    'vue/require-default-prop': 2,
    'vue/require-prop-types': 2,
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/name-property-casing': ['error', 'PascalCase'],
  },
};
