import { and, eq } from 'drizzle-orm'
import {
  int,
  timestamp,
  mysqlTable as defaultMySqlTableFn,
  primaryKey,
  varchar,
  type MySqlTableFn,
  type MySqlDatabase,
} from 'drizzle-orm/mysql-core'

import { createId } from '@paralleldrive/cuid2'
import type { Adapter, AdapterAccount } from '@auth/core/adapters'
import { createCuid2 } from '@/db/utils/createCuid2'

export function createTables(mySqlTable: MySqlTableFn) {
  const users = mySqlTable('user', {
    id: createCuid2(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    emailVerified: timestamp('emailVerified', {
      mode: 'date',
      fsp: 3,
    }).defaultNow(),
    image: varchar('image', { length: 255 }),
  })

  const accounts = mySqlTable(
    'account',
    {
      userId: createCuid2(),
      type: varchar('type', { length: 255 })
        .$type<AdapterAccount['type']>()
        .notNull(),
      provider: varchar('provider', { length: 255 }).notNull(),
      providerAccountId: varchar('providerAccountId', {
        length: 255,
      }).notNull(),
      refresh_token: varchar('refresh_token', { length: 255 }),
      access_token: varchar('access_token', { length: 255 }),
      expires_at: int('expires_at'),
      token_type: varchar('token_type', { length: 255 }),
      scope: varchar('scope', { length: 255 }),
      id_token: varchar('id_token', { length: 255 }),
      session_state: varchar('session_state', { length: 255 }),
    },
    (account) => ({
      pk: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    }),
  )

  const sessions = mySqlTable('session', {
    sessionToken: varchar('sessionToken', { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar('userId', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  })

  const verificationTokens = mySqlTable(
    'verificationToken',
    {
      identifier: varchar('identifier', { length: 255 }).notNull(),
      token: varchar('token', { length: 255 }).notNull(),
      expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => ({
      pk: primaryKey({ columns: [vt.identifier, vt.token] }),
    }),
  )

  return { users, accounts, sessions, verificationTokens }
}

export type DefaultSchema = ReturnType<typeof createTables>

export function planetScaleDrizzleAdapter(
  client: InstanceType<typeof MySqlDatabase>,
  tableFn = defaultMySqlTableFn,
): Adapter {
  const { users, accounts, sessions, verificationTokens } =
    createTables(tableFn)

  return {
    // @ts-expect-error
    async createUser(data) {
      const id = createId()

      await client.insert(users).values({ ...data, id })

      return await client
        .select()
        .from(users)
        .where(eq(users.id, id))
        .then((res) => res[0])
    },
    async getUser(data) {
      const thing =
        (await client
          .select()
          .from(users)
          .where(eq(users.id, data))
          .then((res) => res[0])) ?? null

      return thing
    },
    async getUserByEmail(data) {
      const user =
        (await client
          .select()
          .from(users)
          .where(eq(users.email, data))
          .then((res) => res[0])) ?? null

      return user
    },
    // @ts-expect-error
    async createSession(data) {
      await client.insert(sessions).values(data)

      return await client
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .then((res) => res[0])
    },
    async getSessionAndUser(data) {
      const sessionAndUser =
        (await client
          .select({
            session: sessions,
            user: users,
          })
          .from(sessions)
          .where(eq(sessions.sessionToken, data))
          .innerJoin(users, eq(users.id, sessions.userId))
          .then((res) => res[0])) ?? null

      return sessionAndUser
    },
    // @ts-expect-error
    async updateUser(data) {
      if (!data.id) {
        throw new Error('No user id.')
      }

      await client.update(users).set(data).where(eq(users.id, data.id))

      return await client
        .select()
        .from(users)
        .where(eq(users.id, data.id))
        .then((res) => res[0])
    },
    async updateSession(data) {
      await client
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))

      return await client
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .then((res) => res[0])
    },
    async linkAccount(rawAccount) {
      await client.insert(accounts).values(rawAccount)
    },
    async getUserByAccount(account) {
      const dbAccount =
        (await client
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider),
            ),
          )
          .leftJoin(users, eq(accounts.userId, users.id))
          .then((res) => res[0])) ?? null

      if (!dbAccount) {
        return null
      }

      return dbAccount.user
    },
    async deleteSession(sessionToken) {
      const session =
        (await client
          .select()
          .from(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .then((res) => res[0])) ?? null

      await client
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken))

      return session
    },
    async createVerificationToken(token) {
      await client.insert(verificationTokens).values(token)

      return await client
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.identifier, token.identifier))
        .then((res) => res[0])
    },
    async useVerificationToken(token) {
      try {
        const deletedToken =
          (await client
            .select()
            .from(verificationTokens)
            .where(
              and(
                eq(verificationTokens.identifier, token.identifier),
                eq(verificationTokens.token, token.token),
              ),
            )
            .then((res) => res[0])) ?? null

        await client
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token),
            ),
          )

        return deletedToken
      } catch (err) {
        throw new Error('No verification token found.')
      }
    },
    async deleteUser(id) {
      const user = await client
        .select()
        .from(users)
        .where(eq(users.id, id))
        .then((res) => res[0] ?? null)

      await client.delete(users).where(eq(users.id, id))

      return user
    },
    async unlinkAccount(account) {
      await client
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider),
          ),
        )

      return undefined
    },
  }
}

/*
Type '(data: Omit<AdapterUser, "id">) => Promise<AdapterUser | { id: string | null; name: string | null; email: string; emailVerified: Date | null; image: string | null; } | undefined>'

is not assignable to type 

'(user: Omit<AdapterUser, "id">) => Awaitable<AdapterUser>'.




Type 'Promise<AdapterUser | { id: string | null; name: string | null; email: string; emailVerified: Date | null; image: string | null; } | undefined>'

is not assignable to type

'Awaitable<AdapterUser>'.


Type 'Promise<AdapterUser | { id: string | null; name: string | null; email: string; emailVerified: Date | null; image: string | null; } | undefined>' 

is not assignable to type 'PromiseLike<AdapterUser>'.

Types of property 'then' are incompatible.







Type '<TResult1 = AdapterUser | { id: string | null; name: string | null; email: string; emailVerified: Date | null; image: string | null; } | undefined, TResult2 = never>(onfulfilled?: ((value: AdapterUser | { ...; } | undefined) => TResult1 | PromiseLike<...>) | null | undefined, onrejected?: ((reason: any) => TResult2 ...' is not assignable to type '<TResult1 = AdapterUser, TResult2 = never>(onfulfilled?: ((value: AdapterUser) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<...>) | ... 1 more ... | undefined) => PromiseLike<...>'.
          Types of parameters 'onfulfilled' and 'onfulfilled' are incompatible.
            Types of parameters 'value' and 'value' are incompatible.
              Type 'AdapterUser | { id: string | null; name: string | null; email: string; emailVerified: Date | null; image: string | null; } | undefined' is not assignable to type 'AdapterUser'.
                Type 'undefined' is not assignable to type 'AdapterUser'.ts(2322)
adapters.d.ts(257, 5): The expected type comes from property 'createUser' which is declared here on type 'Adapter'
*/
