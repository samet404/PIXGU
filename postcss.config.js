const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    'postcss-import': {},
  },
};

export default config;