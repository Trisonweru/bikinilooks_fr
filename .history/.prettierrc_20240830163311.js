module.exports = {
  arrowParens: 'always',
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  semi: true,
  plugins: [
    require.resolve('prettier-plugin-tailwindcss')
  ],
  tailwindConfig: './tailwind.config.js',
};
