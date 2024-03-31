export type DatabaseUser = {
  id: string
  username: string
  usernameID: string
  usernameWithUsernameID: string
  profilePicture: string | null
} & (GitHubUser | DiscordUser | GoogleUser)

type GitHubUser = {
  github_id: number
}

type DiscordUser = {
  discord_id: number
}

type GoogleUser = {
  google_id: number
}
