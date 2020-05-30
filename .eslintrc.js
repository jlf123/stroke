module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'prettier',
        'prettier/react',
        'plugin:jest/recommended',
        'plugin:import/react',
        'plugin:import/recommended',
        'plugin:unicorn/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        eqeqeq: 'error',
        'no-bitwise': 'error',
        curly: 'error',
        'guard-for-in': 'error',
        'no-use-before-define': 'error',
        'no-caller': 'error',
        'no-new': 'error',
        indent: ['warn', 4],
        'max-params': ['warn', 3],
        'max-depth': ['error', 4],
        complexity: ['warn', { max: 8 }],
        'no-var': 'error',
        'no-console': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_$' }],
        'prefer-promise-reject-errors': 'error',
        camelcase: ['error'],
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/extensions': ['error', 'never'],
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/unambiguous': 'off',
        'import/no-useless-path-segments': 'error',
        'import/no-self-import': 'error',
        'import/export': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/no-commonjs': 'error',
        'no-unused-expressions': 'off',
        'react/no-deprecated': 'warn',
        'react/prop-types': 'error',
        'react/display-name': 'off',
        'space-before-function-paren': 'off'
    }
}
