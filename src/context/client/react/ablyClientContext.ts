import type { Realtime } from 'ably'
import { createContext } from 'react'

export const AblyClientContext = createContext<Realtime | null>(null)
