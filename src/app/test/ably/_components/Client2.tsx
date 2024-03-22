import * as Ably from 'ably'
import { type Types } from 'ably'
import { useChannel, usePresence } from 'ably/react'
import { useRef, useState } from 'react'
import { useInterval } from 'usehooks-ts'

const Client2 = () => {
  const [messages, updateMessages] = useState<Types.Message[]>([])
  const count = useRef<number>(0)

  const { channel, channelError, connectionError } = useChannel(
    'your-channel-name',
    (message: Types.Message) => {
      updateMessages((prev) => [...prev, message])
      console.log(messages)
    },
  )

  if (channelError) {
    console.error('WS Channel error', channelError)
  }

  if (connectionError) {
    console.error('WS Connection error', connectionError)
  }

  channel.on('failed', (stateChange: Types.ChannelStateChange) =>
    console.error('Channel state failed with error', stateChange.reason),
  )

  channel.on('suspended', (stateChange: Types.ChannelStateChange) =>
    console.info('Channel state suspended with error', stateChange.reason),
  )

  channel.on('detached', (stateChange: Types.ChannelStateChange) =>
    console.info('Channel state detached with error', stateChange.reason),
  )

  const publish = async () =>
    await channel.publish('your-event-name', 'your-message')

  // useInterval(() => {
  //   const countNum = count.current

  //   if (countNum > 500) return null

  //   count.current = countNum + 1

  //   console.log('ably test' + countNum)
  //   publish()
  // }, 1000)

  return (
    <button onClick={publish} className="rounded-md bg-blue-500 p-2 text-white">
      Send message
    </button>
  )
}
export default Client2
