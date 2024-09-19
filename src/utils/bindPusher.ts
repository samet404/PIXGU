export const bindPusher = (
  //   eventName: EventName,
  callback: () => void,
  context?: any,
) => {}

// export type EventName =
// | SubscriptionErrorEventName
// | SubscriptionSucceededEventName
// | `${string}`

export type PresenceChannelEventName =
  | MemberAddedEventName
  | MemberRemovedEventName

export type SubscriptionSucceededEventName = 'pusher:subscription_succeeded'
export type SubscriptionErrorEventName = 'pusher:subscription_error'
export type MemberAddedEventName = 'pusher:member_added'
export type MemberRemovedEventName = 'pusher:member_removed'
