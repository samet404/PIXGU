import type { User } from 'lucia'
import { positiveLog } from '@/utils'
import type Pusher from 'pusher-js'
import { createPeer } from './createPeer'

export const memberAdded = (
  member: {
    id: string
    info: Omit<User, 'id'>
  },
  myUserID: string,
  roomID: string,
  soketiClient: Pusher,
) => {
  console.log('memberAdded', member)
  const userID = member.id

  positiveLog(`USER ${userID} ENTERED >`)
  positiveLog(`INITIATING PEER CONNECTION TO ${userID}`)
  createPeer(soketiClient, roomID, userID, member, myUserID)
}
