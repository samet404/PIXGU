import type { PresenceChannel } from 'pusher-js'
import type PrivateChannel from 'pusher-js/types/src/core/channels/private_channel'
import type Pusher from 'pusher-js'
import { toPusherKey } from './toPusherKey'

export const subscribePusher = <T extends ChannelName>(
  client: Pusher,
  channelName: T,
) =>
  client.subscribe(toPusherKey(channelName)) as T extends PrivateChannelName
    ? PrivateChannel
    : T extends PresenceChannelName
      ? PresenceChannel
      : T extends PrivatePresenceChannelName
        ? PrivatePresenceChannelName
        : never

type ChannelName =
  | PrivateChannelName
  | PresenceChannelName
  | PrivatePresenceChannelName

type PrivateChannelName = `private-${string}`
type PresenceChannelName = `presence-${string}`
type PrivatePresenceChannelName = `private-presence-${string}`
