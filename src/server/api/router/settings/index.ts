import { createTRPCRouter } from '@/server/api/trpc'
import { getDeveloperMode, setDeveloperMode } from './subroute/_index'
import { getAll } from './subroute/getAll'

export const settingsRouter = createTRPCRouter({
  getDeveloperMode,
  setDeveloperMode,
  getAll,
})
