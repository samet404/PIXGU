import PusherServer from 'pusher'

export const pusherServer = new PusherServer({
  // appId: env.NEXT_PUBLIC_PUSHER_APP_ID,
  // key: env.PUSHER_KEY,
  // secret: env.PUSHER_SECRET,
  // cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  // useTLS: true,
  appId: "1751233",
  key: "919b9c1248e43bca4e96",
  secret: "9e4789d7befc4ff03efc",
  cluster: "eu",
  useTLS: true,
})

