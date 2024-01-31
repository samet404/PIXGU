import { lucia } from 'lucia'
import { nextjs_future } from 'lucia/middleware'
import { pg as pgAdapter } from '@lucia-auth/adapter-postgresql'
import { discord, github, google, spotify } from '@lucia-auth/oauth/providers'
import { pool } from '@/sqlDb'
import { env } from '@/env/server.mjs'

export const auth = lucia({
  env: 'DEV', // "PROD" if deployed to HTTPS
  middleware: nextjs_future(), // NOT nextjs()
  sessionCookie: {
    expires: false,
  },
  adapter: pgAdapter(pool, {
    user: 'user',
    key: 'user_key',
    session: 'user_session',
  }),
  getUserAttributes: (data) => {
    return {
      profilePicture: data.profile_picture,
      username: data.username,
      usernameID: data.username_ID,
      usernameWithUsernameID: data.username_with_username_ID,
    }
  },
})

// export const githubAuth = github(auth, {
//   clientId: env.GITHUB_CLIENT_ID ?? '',
//   clientSecret: env.GITHUB_CLIENT_SECRET ?? '',
// })

// export const spotifyAuth = spotify(auth, {
//   clientId: env.SPOTIFY_CLIENT_ID ?? '',
//   clientSecret: env.SPOTIFY_CLIENT_SECRET ?? '',
//   redirectUri: env.SPOTIFY_REDIRECT_URI ?? '',
// })

export const discordAuth = discord(auth, {
  clientId: env.DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
  redirectUri: env.DISCORD_REDIRECT_URI,
})

// export const googleAuth = google(auth, {
//   clientId: env.GOOGLE_CLIENT_ID ?? '',
//   clientSecret: env.GOOGLE_CLIENT_SECRET ?? '',
//   redirectUri: env.GOOGLE_REDIRECT_URI ?? '',
// })
