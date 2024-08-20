/**
 * Converts colons to double underscores because Pusher doesn't allow colons in channel names.
 * We are using colons in our channel names to separate names.
 */
export const toPusherKey = (key: string) => key.replace(/:/g, '__')
