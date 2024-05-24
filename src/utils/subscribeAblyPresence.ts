import type {
  messageCallback,
  PresenceAction,
  PresenceMessage,
  RealtimeChannel,
} from 'ably'

/**
 * Subscribes to presence events on a channel.
 *
 * @param channel The channel to subscribe to.
 * @param action The presence action to subscribe to.
 * @param listener The callback to be called when a presence event is received.
 */
export const subscribeAblyPresence = async (
  channel: RealtimeChannel,
  action: PresenceAction | Array<PresenceAction>,
  listener: messageCallback<PresenceMessage>,
): Promise<void> => await channel.presence.subscribe(action, listener)
