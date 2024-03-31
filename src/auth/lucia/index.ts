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
    return {
      username: attributes.username,
      usernameID: attributes.usernameID,
      usernameWithUsernameID: attributes.usernameWithUsernameID,
      profilePicture: attributes.profilePicture,
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
