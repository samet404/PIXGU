import { type WebRTCConnData } from '@/app/room/[roomID]/_types'
import {
  ablyClientAtom,
  myPeerAtom,
  roomIDAtom,
  setPlayerAtom,
  userAtom,
} from '@/app/room/[roomID]/atoms'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type Message } from 'ably'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'

/**
 * This hook is used to connect with other users in the room.
 */
export const useMeetOthers = () => {
  const [error, setError] = useState<Err | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const user = useAtomValue(userAtom)!
  const setPlayer = useSetAtom(setPlayerAtom)
  const myPeer = useAtomValue(myPeerAtom)!
  const ablyClient = useAtomValue(ablyClientAtom)!
  const roomID = useAtomValue(roomIDAtom)

  useEffectOnce(() => {
    try {
      if (!user) return void null

      // this channel used to send myFirstGift or otherwise
      const generalMeetingChannel = ablyClient.channels.get(
        `room:${roomID}:meeting`,
      )

      // Listening general meeting channel for take their first gift
      subscribeAblyPresence(
        generalMeetingChannel,
        'enter',
        (message: Message) => {
          const theirFirstGift: FirstGift = message.data.data

          if (theirFirstGift.peerID == myPeer.id) return null

          const yourFirstGiftToNewUser = {
            peerID: myPeer.id,
          }
          const theirMeetChannel = ablyClient.channels.get(
            `room:${roomID}:meet:${theirFirstGift.peerID}`,
          )

          theirMeetChannel.publish('meet', yourFirstGiftToNewUser)

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

            const yourMeetGiftToNewUser: WebRTCConnData = {
              type: 'meet',
              userInfo: user,
            }

            conn.send(yourMeetGiftToNewUser)
          })
        },
      )

      console.log('myPeerID ' + myPeer.id)
      const yourFirstMeetGift: FirstGift = {
        peerID: myPeer.id,
      }

      // When i sent them my firstGift, they will send me their gift to myMeetChannel
      const myMeetChannel = ablyClient.channels.get(
        `room:${roomID}:meet:${myPeer.id}`,
      )

      // Listening to their gift to me
      myMeetChannel.subscribe('meet', (message: Message) => {
        const data: FirstGift = message.data

        const conn = myPeer.connect(data.peerID)

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

          const yourGiftToPrevUser: WebRTCConnData = {
            type: 'meet',
            userInfo: user,
          }

          conn.send(yourGiftToPrevUser)
        })
      })

      generalMeetingChannel.presence.enter(yourFirstMeetGift)

      setIsSuccess(true)
    } catch (e) {
      if (e instanceof Error) setError({ msg: e.message })

      setError({ msg: 'UNKNOWN ERR' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  return { meetError: error, meetIsSuccess: isSuccess }
}

type FirstGift = {
  peerID: string
}

type Err = {
  msg: string
}
