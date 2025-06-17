import { createTRPCRouter } from '@/server/api/trpc'
import {
  setNewLocale,
  getLocale
} from './subroute'

export const userRouter = createTRPCRouter({
  setNewLocale,
  getLocale
})
