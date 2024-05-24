'use client'

import { api } from '@/trpc/react'

const Item = ({ ID }: Props) => {
  const isLogged = api.auth.isLogged.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  return <div>{ID}</div>
}

export default Item

type Props = {
  ID: string
}
