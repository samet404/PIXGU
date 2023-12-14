import NextAuth from 'next-auth'
// providers
import GithubProvider from 'next-auth/providers/github'
import DiscordProvider from 'next-auth/providers/discord'
import SpotifyProvider from 'next-auth/providers/spotify'
// types
import { type NextAuthOptions } from 'next-auth'
// adapter
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const env = process.env

type DiscordProviderProfile = {
  id: string
  username: string
  avatar: string
  discriminator: string
  public_flags: number
  premium_type: number
  flags: number
  banner: any
  accent_color: number
  global_name: string
  avatar_decoration_data: any
  banner_color: string
  mfa_enabled: boolean
  locale: string
  email: string
  verified: boolean
  image_url: string
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID!,
      clientSecret: env.GITHUB_SECRET!,
    }),

    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID!,
      clientSecret: env.DISCORD_CLIENT_SECRET!,

      profile(profile: DiscordProviderProfile, tokens) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
        } else {
          const format = profile.avatar.startsWith('a_') ? 'gif' : 'png'
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
        }
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.image_url,
        }
      },
    }),

    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID!,
      clientSecret: env.SPOTIFY_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
        }
      },
    }),
  ],
  debug: true,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
