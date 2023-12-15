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
    }),

    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID!,
      clientSecret: env.SPOTIFY_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  debug: true,
}
