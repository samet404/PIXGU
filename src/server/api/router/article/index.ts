import { createTRPCRouter } from '@/server/api/trpc'
import { getByID } from './subroutes'

export const articleRouter = createTRPCRouter({
  getById: getByID,
})