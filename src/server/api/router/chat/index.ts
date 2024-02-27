import { createTRPCRouter } from '@/server/api/trpc'
import {
  getLatestSpokenUser,
  setLatestSpokenUser,
  getNewMessage,
  getPrevChatMessages,
  setNewMessage,
} from './subroute'

export const chatRouter = createTRPCRouter({
  getPrevChatMessages: getPrevChatMessages,
  getNewMessage: getNewMessage,
  setNewMessage: setNewMessage,

  setLatestSpokenUser: setLatestSpokenUser,
  getLatestSpokenUser: getLatestSpokenUser,
})
