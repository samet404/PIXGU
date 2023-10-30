const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {
      preset: ["default", { discardComments: { removeAll: true } }],
    },
  },
};

module.exports = config;
