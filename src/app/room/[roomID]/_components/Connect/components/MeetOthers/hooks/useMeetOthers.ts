import { type User, type WebRTCConnData } from '@/app/room/[roomID]/_types'
import {
  ablyClientAtom,
  myPeerAtom,
  roomIDAtom,
  setPlayerAtom,
} from '@/app/room/[roomID]/atoms'
import { type Message } from 'ably'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

/**
 * This hook is used to connect with other users in the room.
 */
export const useMeetOthers = (selfInfo: User) => {
  const setPlayer = useSetAtom(setPlayerAtom)
  const myPeer = useAtomValue(myPeerAtom)!
  const ablyClient = useAtomValue(ablyClientAtom)!
  const roomID = useAtomValue(roomIDAtom)

  useEffect(() => {
    if (selfInfo) {
      // this channel used to send myFirstGift or otherwise
      const generalMeetingChannel = ablyClient.channels.get(
        `room:${roomID}:meeting`,
      )

      // Listening general meeting channel for take their first gift
      generalMeetingChannel.subscribe('meet', (message: Message) => {
        const theirFirstGift: FirstGift = message.data
        const yourGiftToNewUser: WebRTCConnData = {
          type: 'meet',
          userInfo: selfInfo,
        }
        const theirMeetChannel = ablyClient.channels.get(
          `room:${roomID}:meet:${theirFirstGift.peerID}`,
        )

        theirMeetChannel.publish('meet', yourGiftToNewUser)

        const conn = myPeer.connect(theirFirstGift.peerID)

        conn.on('open', () => {
          conn.on('data', (connData) => {
            const data = connData as WebRTCConnData

            if (data.type === 'meet') {
              const user = data.userInfo

              setPlayer({
                id: user.id,
                profilePicture: user.profilePicture,
                usernameWithUsernameID: user.usernameWithUsernameID,
                peerConn: conn,
              })
            }
          })

          conn.send(yourGiftToNewUser)
        })
      })

      const yourFirstMeetGift: FirstGift = {
        peerID: myPeer.id,
      }

      // When i sent them my firstGift, they will send me their gift to myMeetChannel
      const myMeetChannel = ablyClient.channels.get(
        `room:${roomID}:meet:${myPeer.id}`,
      )

      // Listening to their gift to me
      myMeetChannel.subscribe('meet', (message: Message) => {
        const data = message.data as FirstGift

        const conn = myPeer.connect(data.peerID)

        conn.on('open', () => {
          conn.on('data', (connData) => {
            const data = connData as WebRTCConnData

            if (data.type === 'meet') {
              const user = data.userInfo
            }
          })

          const yourGiftToPrevUser: WebRTCConnData = {
            type: 'meet',
            userInfo: userInfo as User,
          }

          conn.send(yourGiftToPrevUser)
        })
      })

      generalMeetingChannel.presence.enter(yourFirstMeetGift)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selfInfo])
}

type FirstGift = {
  peerID: string
}
