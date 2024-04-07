const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  pluginSearchDirs: false,
  semi: true,
  singleQuote: true,
  overrides: [
    {
      options: {
        semi: false,
        singleQuote: true,
      },
    },
  ],
};

export default config;
