export const REDIS_ROOM_KEYS_BY_USER_ID = (userID: string) => ({
    createdRooms: `user:${userID}:created_rooms`,
})

export const REDIS_ROOM_KEYS_BY_ROOM_ID = (roomID: string) => ({
    name: `room:${roomID}:name`,
    admins: `room:${roomID}:admins`,
    createdAt: `room:${roomID}:created_at`,
    hostID: `room:${roomID}:host_ID`,
    hostInRoom: `room:${roomID}:host_in_roomID`,
    hostCountry: `room:${roomID}:host_country`,
    hostLL: `room:${roomID}:host_LL`,
    password: `room:${roomID}:password`,
    playersKnownPass: `room:${roomID}:players_known_pass`,
    blockedUsers: `room:${roomID}:blocked_users`,
    totalPlayers: `room:${roomID}:total_players`,
})

export const REDIS_ROOM_OTHERS_KEYS = {
    activePublicRooms: `active_public_rooms`,
    activeRooms: `active_rooms`,
}