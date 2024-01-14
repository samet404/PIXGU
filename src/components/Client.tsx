'use client'

import { api } from '../trpc/react'

const Client = () => {
  const session = api.user.getSession.useQuery()

  console.log(session)
  return <></>
}

export default Client
