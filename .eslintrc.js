module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'prettier/prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: './tsconfig.json',
  },
  env: {
    node: true,
  },
  rules: {
    'import/no-cycle': 'off',
  },
  overrides: [
    {
      files: ['src/app.ts', 'src/scripts/*'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
