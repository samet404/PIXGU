import { useEffectOnce } from '@/hooks/useEffectOnce'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type Realtime } from 'ably'

const Client2 = ({ ablyClient }: { ablyClient: Realtime }) => {
  const channel = ablyClient.channels.get('test-channel')

  useEffectOnce(() => {
    channel.presence.enter()
    void {}
  })

  subscribeAblyPresence(channel, 'enter', () => {
    console.log('Someone entered the channel')
  })

  subscribeAblyPresence(channel, 'leave', () => {
    console.log('Someone left the channel')
  })

  return (
    <button className="rounded-md bg-blue-500 p-2 text-white active:bg-blue-300">
      Send message
    </button>
  )
}
export default Client2
