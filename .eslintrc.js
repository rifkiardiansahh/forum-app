module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-console': 'warn',
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'], // Izinkan titik koma (WAJIB pakai)
    'space-before-function-paren': ['error', 'never'], // Tanpa spasi sebelum kurung fungsi
    'no-undef': 'off', // Matikan aturan no-undef untuk mengizinkan penggunaan variabel yang belum didefinisikan
    'eol-last': 'off'
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
