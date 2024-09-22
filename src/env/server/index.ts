// https://env.t3.gg/docs/introduction
// https://env.t3.gg/docs/nextjs

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    XATA_BRANCH: z.string(),
    XATA_API_KEY: z.string(),
    XATA_CONNECTION_STRING: z.string(),

    BASE_URL: z.string(),

    REDIS_URL: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_REDIS_URL_HERE'),
        'You forgot to change the default REDIS_URL',
      ),
    DISCORD_CLIENT_ID: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_DISCORD_CLIENT_ID_HERE'),
        'You forgot to change the default discord client id',
      ),

    DISCORD_CLIENT_SECRET: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_DISCORD_CLIENT_SECRET_HERE'),
        'You forgot to change the default discord client secret',
      ),

    DISCORD_REDIRECT_URI: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_DISCORD_REDIRECT_URI_HERE'),
        'You forgot to change the default discord redirect uri',
      ),

    SPOTIFY_CLIENT_ID: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_SPOTIFY_CLIENT_ID_HERE'),
        'You forgot to change the default spotify client id',
      ),

    SPOTIFY_CLIENT_SECRET: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_SPOTIFY_CLIENT_SECRET_HERE'),
        'You forgot to change the default spotify client secret',
      ),

    GITHUB_CLIENT_ID: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_GITHUB_CLIENT_ID_HERE'),
        'You forgot to change the default github client id',
      ),

    GITHUB_CLIENT_SECRET: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_GITHUB_CLIENT_SECRET_HERE'),
        'You forgot to change the default github client secret',
      ),

    GOOGLE_CLIENT_ID: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_GOOGLE_CLIENT_ID_HERE'),
        'You forgot to change the default google client id',
      ),

    GOOGLE_CLIENT_SECRET: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_GOOGLE_CLIENT_SECRET_HERE'),
        'You forgot to change the default google client secret',
      ),

    GOOGLE_REDIRECT_URI: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_GOOGLE_REDIRECT_URI_HERE'),
        'You forgot to change the default google redirect uri',
      ),

    PUSHER_APP_ID: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_PUSHER_APP_ID_HERE'),
        'You forgot to change the default pusher app id',
      ),
    PUSHER_KEY: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_PUSHER_KEY_HERE'),
        'You forgot to change the default pusher key',
      ),
    PUSHER_SECRET: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_PUSHER_SECRET_HERE'),
        'You forgot to change the default pusher secret',
      ),
    PUSHER_WS_HOST: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_PUSHER_WS_HOST_HERE'),
        'You forgot to change the default pusher secret',
      ),

    PUSHER_CLUSTER: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_PUSHER_CLUSTER_HERE'),
        'You forgot to change the default pusher cluster',
      ),
    PUSHER_PORT: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_PUSHER_PORT_HERE'),
        'You forgot to change the default pusher port',
      ),

    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    ROOT_FOLDER_NAME: z.string().default('PIXGU'),
    IP_ADDRESS: z.string().default('66.6.44.4'),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    IP_ADDRESS: process.env.IP_ADDRESS,
    ROOT_FOLDER_NAME: process.env.ROOT_FOLDER_NAME,
    NODE_ENV: process.env.NODE_ENV,

    BASE_URL: process.env.BASE_URL,

    XATA_BRANCH: process.env.XATA_BRANCH,
    XATA_API_KEY: process.env.XATA_API_KEY,
    XATA_CONNECTION_STRING: process.env.XATA_CONNECTION_STRING,

    REDIS_URL: process.env.REDIS_URL,

    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,

    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,

    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,

    PUSHER_WS_HOST: process.env.PUSHER_WS_HOST,
    PUSHER_APP_ID: process.env.PUSHER_APP_ID,
    PUSHER_KEY: process.env.PUSHER_KEY,
    PUSHER_SECRET: process.env.PUSHER_SECRET,
    PUSHER_PORT: process.env.PUSHER_PORT,
    PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
