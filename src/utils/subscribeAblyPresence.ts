import type {
  messageCallback,
  PresenceAction,
  PresenceMessage,
  RealtimeChannel,
} from 'ably'

export const subscribeAblyPresence = async (
  channel: RealtimeChannel,
  action: PresenceAction | Array<PresenceAction>,
  listener: messageCallback<PresenceMessage>,
): Promise<void> => await channel.presence.subscribe(action, listener)
