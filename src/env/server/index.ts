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
    NEON_DATABASE_URL: z.string(),
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

    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    ROOT_FOLDER_NAME: z.string().default('PIXGU'),
    IP_ADDRESS: z.string().default('66.6.44.4'),
    CANARY: z.enum(['0', '1']),
    ADMIN_AUTH_SECRET: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    ADMIN_AUTH_SECRET: process.env.ADMIN_AUTH_SECRET,

    IP_ADDRESS: process.env.IP_ADDRESS,
    ROOT_FOLDER_NAME: process.env.ROOT_FOLDER_NAME,
    NODE_ENV: process.env.NODE_ENV,

    BASE_URL: process.env.BASE_URL,

    NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,

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

    CANARY: process.env.CANARY
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
