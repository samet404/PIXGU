import { ROOM_ID_LENGTH } from '@/constants'
import { z } from 'zod'

export const roomIDSchema = z.string().cuid2().length(ROOM_ID_LENGTH)