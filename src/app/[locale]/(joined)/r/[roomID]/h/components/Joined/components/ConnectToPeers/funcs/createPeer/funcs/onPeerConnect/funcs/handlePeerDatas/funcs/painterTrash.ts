import { sendToAllPeers } from '@/utils/sendToAllPeers'

export const painterTrash = () =>
  sendToAllPeers({
    from: 'host',
    event: 'painterTrash',
  })
