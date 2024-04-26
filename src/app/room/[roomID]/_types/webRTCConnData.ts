import type { User } from '.'

export type WebRTCConnData = Meeting | Chat

type Meeting = {
  type: 'meet'
  userInfo: User
}

type Chat = {
  type: 'chat'
  id: string
  message: string
  username: string
  profilePicture: string
}
