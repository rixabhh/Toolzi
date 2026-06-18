import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const browserGlobals = {
  Blob: 'readonly',
  CanvasRenderingContext2D: 'readonly',
  ClipboardEvent: 'readonly',
  File: 'readonly',
  FileReader: 'readonly',
  HTMLAnchorElement: 'readonly',
  HTMLCanvasElement: 'readonly',
  HTMLImageElement: 'readonly',
  Image: 'readonly',
  KeyboardEvent: 'readonly',
  MouseEvent: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
  alert: 'readonly',
  atob: 'readonly',
  btoa: 'readonly',
  clearInterval: 'readonly',
  clearTimeout: 'readonly',
  console: 'readonly',
  crypto: 'readonly',
  document: 'readonly',
  fetch: 'readonly',
  localStorage: 'readonly',
  navigator: 'readonly',
  setInterval: 'readonly',
  setTimeout: 'readonly',
  window: 'readonly',
};

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: browserGlobals,
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  eslintConfigPrettier
);
