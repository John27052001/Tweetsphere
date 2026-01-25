// postcss.config.cjs - CommonJS format so PostCSS can load it reliably
module.exports = {
  plugins: {
    // Tailwind's PostCSS plugin (v4 style)
    "@tailwindcss/postcss": {},
    // autoprefixer for vendor prefixes
    autoprefixer: {},
  },
};
