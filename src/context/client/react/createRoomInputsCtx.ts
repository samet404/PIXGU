import type { RouterInputs } from '@/trpc/shared'
import { createContext } from 'react'

export const CreateRoomInputsCtx = createContext<
  Partial<RouterInputs['gameRoom']['create']>
>({
  password: null,
  isHostPlayer: false,
})
