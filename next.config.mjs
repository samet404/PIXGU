// https://million.dev
// import million from 'million/compiler'
import createMDX from '@next/mdx'
import { fileURLToPath } from 'node:url'
import createJiti from 'jiti'
import CircularDependencyPlugin from 'circular-dependency-plugin'

const jiti = createJiti(fileURLToPath(import.meta.url))

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti('./src/env/server')
jiti('./src/env/client')

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  webpack: (
    config,
    // { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',

    })

    // Important: return the modified config
    // https://nextjs.org/docs/app/api-reference/next-config-js/webpack

    config.module.rules.push({})

    config.plugins.push(
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // include specific files based on a RegExp
        include: /dir/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
      }),
    )

    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.

      ...config.resolve.fallback,
      fs: false,
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  reactStrictMode: false,
  experimental: {
    reactCompiler: true,
  },
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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
    ],
  },
}

// const millionConfig = { auto: { rsc: false } }

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(config)
// export default million.next(config, millionConfig)
