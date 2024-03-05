// https://million.dev
// import million from 'million/compiler';

import './src/env/client.mjs';
import './src/env/server.mjs';

/** @type {import("next").NextConfig} */
const config = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    // Important: return the modified config
    // https://nextjs.org/docs/app/api-reference/next-config-js/webpack

    config.module.rules.push({});

    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false,
    };

    return config;
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/avatars/**',
      },
    ],
  },
};

// const millionConfig = { auto: { rsc: false } };

export default config;
// export default million.next(config, millionConfig);
