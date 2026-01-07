// eslint.config.js
import babelEslintParser from '@babel/eslint-parser';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    ignores: [
      'app/assets/builds/**',
      'public/assets/**',
    ],
  },
  {
    files: ['app/javascript/**/*.{js,jsx}'],
    languageOptions: {
      parser: babelEslintParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
        ecmaVersion: 2026,
        sourceType: 'module',
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'no-unused-vars': ['warn', {
        varsIgnorePattern: '^(BrowserRouter|App|Routes|Route|Navigation|Home|Placeholder|NavLink)$'
      }],
      'react/react-in-jsx-scope': 'off',
    },
  },
];
