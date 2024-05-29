import type { Peers } from '@/types'
import { createContext } from 'react'

export const PeersContext = createContext<Peers>({})
