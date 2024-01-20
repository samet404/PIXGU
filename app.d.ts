// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./src/auth/lucia').Auth
  type DatabaseUserAttributes = {
    username: string
    username_id: number
    profile_picture: string | null
    // playing_room_id: string
    // playing_room_score_id: string
  }
  type DatabaseSessionAttributes = object
}
