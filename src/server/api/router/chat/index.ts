import { createTRPCRouter } from '@/server/api/trpc'
import {
  getLatestSpokenUser,
  setLatestSpokenUser,
  getPrevChatMessages,
  setNewMessage,
} from './subroute'

export const chatRouter = createTRPCRouter({
  getPrevChatMessages: getPrevChatMessages,
  setNewMessage: setNewMessage,

  setLatestSpokenUser: setLatestSpokenUser,
  getLatestSpokenUser: getLatestSpokenUser,
})
