import 'server-only'

import { Lucia } from 'lucia'
import { adapter } from './adapter'
import type { DatabaseUser } from '@/auth/types'

// import { webcrypto } from "crypto";
// globalThis.crypto = webcrypto as Crypto;

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    const { profilePicture, username, usernameID, usernameWithUsernameID } =
      attributes

    return {
      username: username,
      usernameID: usernameID,
      usernameWithUsernameID: usernameWithUsernameID,
      profilePicture: profilePicture,
    }
  },
})

declare module 'lucia' {
  // eslint-disable-next-line no-unused-vars
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Omit<DatabaseUser, 'id'>
  }
}
