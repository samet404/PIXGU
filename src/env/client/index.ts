// https://env.t3.gg/docs/introduction
// https://env.t3.gg/docs/nextjs

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */

  client: {
    NEXT_PUBLIC_PUSHER_KEY: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_NEXT_PUBLIC_PUSHER_KEY_HERE'),
        'You forgot to change the default next public pusher key',
      ),
    NEXT_PUBLIC_PUSHER_WS_HOST: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_NEXT_PUBLIC_PUSHER_WS_HOST_HERE'),
        'You forgot to change the default next public pusher ws host',
      ),
    NEXT_PUBLIC_PUSHER_WSS_PORT: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_NEXT_PUBLIC_PUSHER_WSS_PORT_HERE'),
        'You forgot to change the default next public pusher ws host',
      ),

    NEXT_PUBLIC_PUSHER_CLUSTER: z
      .string()
      .refine(
        (str) => !str.includes('YOUR_NEXT_PUBLIC_PUSHER_CLUSTER_HERE'),
        'You forgot to change the default next public pusher cluster',
      ),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    NEXT_PUBLIC_PUSHER_WSS_PORT: process.env.NEXT_PUBLIC_PUSHER_WSS_PORT,
    NEXT_PUBLIC_PUSHER_WS_HOST: process.env.NEXT_PUBLIC_PUSHER_WS_HOST,
    NEXT_PUBLIC_PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
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
