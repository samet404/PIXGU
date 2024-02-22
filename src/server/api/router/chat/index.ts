import { createTRPCRouter } from '@/server/api/trpc'
import { getLatestSpokenUserID, setLatestSpokenUserID } from './subroute'

export const chatRouter = createTRPCRouter({
  setLatestSpokenUserID: setLatestSpokenUserID,
  getLatestSpokenUserID: getLatestSpokenUserID,
})
