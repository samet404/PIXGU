// https://env.t3.gg/docs/introduction
// https://env.t3.gg/docs/nextjs

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    SQL_DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes('YOUR_POSTGRESQL_URL_HERE'),
        'You forgot to change the default SQL_DATABASE_URL',
      ),

    UPSTASH_REDIS_REST_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes('YOUR_UPSTASH_REDIS_REST_URL_HERE'),
        'You forgot to change the default UPSTASH_REDIS_REST_URL',
      ),

    UPSTASH_REDIS_REST_TOKEN: z
      .string()
      .refine(
        (str) => !str.includes('UPSTASH_REDIS_REST_TOKEN'),
        'You forgot to change the default UPSTASH_REDIS_REST_TOKEN',
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
      .url()
      .refine(
        (str) => !str.includes('YOUR_DISCORD_REDIRECT_URI_HERE'),
        'You forgot to change the default discord redirect uri',
      ),
    // SPOTIFY_CLIENT_ID: z
    //   .string()
    //   .refine(
    //     (str) => !str.includes('YOUR_SPOTIFY_CLIENT_ID_HERE'),
    //     'You forgot to change the default spotify client id',
    //   ),

    // SPOTIFY_CLIENT_SECRET: z
    //   .string()
    //   .refine(
    //     (str) => !str.includes('YOUR_SPOTIFY_CLIENT_SECRET_HERE'),
    //     'You forgot to change the default spotify client secret',
    //   ),

    // GITHUB_CLIENT_ID: z
    //   .string()
    //   .refine(
    //     (str) => !str.includes('YOUR_GITHUB_CLIENT_ID_HERE'),
    //     'You forgot to change the default github client id',
    //   ),

    // GITHUB_CLIENT_SECRET: z
    //   .string()
    //   .refine(
    //     (str) => !str.includes('YOUR_GITHUB_CLIENT_SECRET_HERE'),
    //     'You forgot to change the default github client secret',
    //   ),

    // GOOGLE_CLIENT_ID: z
    //   .string()
    //   .refine(
    //     (str) => !str.includes('YOUR_GOOGLE_CLIENT_ID_HERE'),
    //     'You forgot to change the default google client id',
    //   ),

    // GOOGLE_CLIENT_SECRET: z
    //   .string()
    //   .refine(
    //     (str) => !str.includes('YOUR_GOOGLE_CLIENT_SECRET_HERE'),
    //     'You forgot to change the default google client secret',
    //   ),

    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    SQL_DATABASE_URL: process.env.SQL_DATABASE_URL,

    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,

    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,

    // SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    // SPOTIFY_CLIENT_SECRET: process.env.YOUR_SPOTIFY_CLIENT_SECRET,

    // GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    // GITHUB_CLIENT_SECRET: process.env.YOUR_GITHUB_CLIENT_SECRET,

    // GOOGLE_CLIENT_ID: process.env.YOUR_GOOGLE_CLIENT_ID,
    // GOOGLE_CLIENT_SECRET: process.env.YOUR_GOOGLE_CLIENT_SECRET,
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
});
