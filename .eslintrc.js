module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: ['standard', 'prettier', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
    'node/no-unsupported-features/node-builtins': ['warn'],
    'node/no-unpublished-require': [
      'warn',
      { allowModules: ['tailwind-scrollbar', 'dotenv'] },
    ],
    'node/no-unpublished-import': ['warn'],
    'node/no-missing-import': ['warn'],
    'no-lone-blocks': ['off'],
    'no-unused-vars': ['warn'],
    'react/prop-types': ['off'],
    'react/jsx-uses-react': ['off'],
    'react/react-in-jsx-scope': ['off'],
  },
  settings: {
    node: { tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts'] },
  },
};
