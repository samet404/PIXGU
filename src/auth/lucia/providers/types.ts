import type { email } from '@/types/email'

export type GitHubUser = {
  login: string
  id: number
  node_id: string
  avatar_url: `https://github.com/images/${string}`
  gravatar_id: string
  url: `https://api.github.com/users/${string}`
  html_url: `https://github.com/${string}`
  followers_url: `https://api.github.com/users/${string}/followers`
  following_url: `https://api.github.com/users/${string}/following${string}`
  gists_url: `https://api.github.com/users/${string}/gists${string}`
  starred_url: `https://api.github.com/users/${string}/starred${string}`
  subscriptions_url: `https://api.github.com/users/${string}/subscriptions`
  organizations_url: `https://api.github.com/users/${string}/orgs`
  repos_url: `https://api.github.com/users/${string}/repos`
  events_url: `https://api.github.com/users/${string}/events${string}`
  received_events_url: `https://api.github.com/users/${string}/received_events`
  type: string
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: string
  email: email
  hireable: boolean
  bio: string
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: Date
  updated_at: Date
  private_gists: number
  total_private_repos: number
  owned_private_repos: number
  disk_usage: number
  collaborators: number
  two_factor_authentication: boolean
  plan: {
    name: string
    space: number
    private_repos: number
    collaborators: number
  }
}

export type DiscordUser = {
  id: string
  username: string
  discriminator: string
  avatar: string
  verified: boolean
  email: email
  flags: number
  banner: string
  accent_color: number
  premium_type: number
  public_flags: number
}
