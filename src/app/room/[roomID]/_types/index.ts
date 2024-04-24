import type { DatabaseUser } from '@/auth/types'

export type User = Omit<DatabaseUser, 'username' | 'usernameID'>
