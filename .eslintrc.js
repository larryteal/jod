module.exports = {
  env: {
    browser: true,
    es2017: true,
    node: true,
    mocha: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'block-scoped-var': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-var': 'error',
    'prefer-const': 'error',
    'eol-last': 'error',
    'prefer-arrow-callback': 'error',
    'no-constant-condition': 'off',
    'no-process-exit': 'off',
    'no-trailing-spaces': 'error',
    quotes: ['warn', 'single', { avoidEscape: true }],
    semi: ['error', 'always']
  }
};
