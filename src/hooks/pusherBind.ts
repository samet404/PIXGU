import type { PusherBindData } from '@/types/pusher'
import { useEffectOnce } from './useEffectOnce'
import { useSoketiClient } from '@/context/client/react'

export const usePusherBind = <T extends keyof PusherBindData>(
  channelName: T,
  eventName: PusherBindData[T]['event'],
  callback: (data: PusherBindData[T]['data']) => void,
) => {
  const soketiClient = useSoketiClient()

  useEffectOnce(() => {
    const channel = soketiClient.subscribe(channelName)

    channel.bind(eventName, callback)
    return () => {
      channel.unsubscribe()
    }
  })
}
