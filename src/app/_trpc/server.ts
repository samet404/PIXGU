import { httpLink } from '@trpc/client'

import { AppRouter, appRouter } from '@/server/index'

export const serverClient = appRouter.createCaller