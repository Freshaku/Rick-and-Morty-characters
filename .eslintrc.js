module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:import/recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    ecmaVersion: 12,
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js', 'next.config.js'],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        },
        multilineDetection: 'brackets',
      },
    ],
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-indent': [2, 2, { indentLogicalExpressions: true }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'consistent-return': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'implicit-arrow-linebreak': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    "@typescript-eslint/no-explicit-any": ["off"]
  }
};
