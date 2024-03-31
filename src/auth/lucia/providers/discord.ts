import { Discord } from 'arctic'
import { env } from '@/env/server.mjs'

export const discord = new Discord(
  env.DISCORD_CLIENT_ID,
  env.DISCORD_CLIENT_SECRET,
  env.DISCORD_REDIRECT_URI,
)
