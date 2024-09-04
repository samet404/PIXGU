'use client'

import { api } from '@/trpc/client'

export const Client = () => {
  ;(async () => {
    const data = await api.auth.getUser.query()
    console.log(data)
  })()
  return <div>Client</div>
}
