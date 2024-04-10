export const iceServers = [
  {
    urls: 'stun:stun.relay.metered.ca:80',
  },
  {
    urls: 'turn:global.relay.metered.ca:80',
    username: '1252ec2ff8cbf7bbe9612a4c',
    credential: 'fiFfxEzHiSroCZ9w',
  },
  {
    urls: 'turn:global.relay.metered.ca:80?transport=tcp',
    username: '1252ec2ff8cbf7bbe9612a4c',
    credential: 'fiFfxEzHiSroCZ9w',
  },
  {
    urls: 'turn:global.relay.metered.ca:443',
    username: '1252ec2ff8cbf7bbe9612a4c',
    credential: 'fiFfxEzHiSroCZ9w',
  },
  {
    urls: 'turns:global.relay.metered.ca:443?transport=tcp',
    username: '1252ec2ff8cbf7bbe9612a4c',
    credential: 'fiFfxEzHiSroCZ9w',
  },
]
