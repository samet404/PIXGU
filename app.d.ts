// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./src/auth/lucia').Auth
  type DatabaseUserAttributes = {
    username: string
    username_ID: string
    username_with_username_ID: string
    profile_picture: string | null
  }
  type DatabaseSessionAttributes = object
}
