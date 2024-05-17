export type WebRTCConnData = Meeting | Chat

type Meeting = {
  event: 'meet'
  userInfo: {
    id: string
    name: string
    pfp: string | null
  }
}

type Chat = {
  event: 'chat'
  id: string
  message: string
  username: string
  profilePicture: string
}
