import { useEffectOnce } from '@/hooks/useEffectOnce'
import { api } from '@/trpc/react'
import { OverrideProps } from '@/types/overrideProps'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type PresenceMessage, type RealtimeChannel } from 'ably'
import type Peer from 'peerjs'
import { type DataConnection } from 'peerjs'
import { type MutableRefObject, useRef } from 'react'

type ConnectOthersProps = {
  channel: RealtimeChannel
  connectionID: string
  myPeer: Peer
  conns: MutableRefObject<DataConnection[] | null>
}

const ConnectOthers = ({
  channel,
  connectionID,
  myPeer,
  conns,
}: ConnectOthersProps) => {
  const peerIDs = api.gameRoom.getPeerIDs.useQuery(
    {
      roomID: 'test',
    },
    {
      enabled: false,
      onSuccess: (data) => {
        console.log('onSuccess', data)

        data.forEach((peerID) => {
          console.log('forEach', data)
          console.log(peerID, myPeer.id)

          if (peerID !== myPeer.id) {
            const conn = myPeer.connect(peerID)

            conn.on('open', () => {
              console.log(`Connected to ${peerID}`)
              conns.current = conns.current ? [...conns.current, conn] : [conn]
            })

            conn.on('data', (data: any) => {
              console.log(`Received data from ${peerID}: ${data.toString()}`)
            })
          }
        })
      },
    },
  )

  myPeer.once('open', () => {
    peerIDs.refetch()
  })

  useEffectOnce(() => {
    subscribeAblyPresence(
      channel,
      'enter',
      (msg: OverrideProps<PresenceMessage, EnterChannelMessageData>) => {
        const { peerID } = msg.data
        console.log('enter presence from connectedOthers.tsx')

        if (!peerIDs.data && peerID == myPeer.id) {
          const conn = myPeer.connect(msg.data.peerID)

          conn.on('open', () => {
            console.log(`Connected to ${msg.data.peerID}`)
            conns.current = conns.current ? [...conns.current, conn] : [conn]

            conn.on('data', (data: any) => {
              console.log(
                `Received data from ${msg.data.peerID}: ${data.toString()}`,
              )
            })
          })
        }
      },
    )
  })

  return <div>ConnectOthers</div>
}

type EnterChannelMessageData = {
  data: {
    peerID: string
  }
}

export default ConnectOthers
