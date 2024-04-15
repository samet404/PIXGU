'use client'

import Btn from './Btn'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'

const BtnDecline = ({ ID }: { ID: string }) => {
  const decline = api.user.declineIncomingFriendRequest.useMutation()
  const router = useRouter()
  if (decline.isSuccess) router.refresh()

  return (
    <Btn
      onClick={() => decline.mutate({ ID: ID })}
      isError={decline.isError}
      isLoading={decline.isLoading}
      isSuccess={decline.isSuccess}
      icon={faMinus}
    />
  )
}
export default BtnDecline
