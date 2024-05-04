'use client'

import { type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useMeetOthers } from './hooks/useMeetOthers'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const MeetOthers = ({ children }: Props) => {
  const { meetError, meetIsSuccess } = useMeetOthers()

  if (meetIsSuccess) return children
  if (meetError)
    return (
      <ErrDisplay
        msg="Failed to meet with other players :("
        reason={meetError.msg}
      />
    )

  return <div className="pt-7">{'Meeting with other players >.< ...'}</div>
}

export default MeetOthers

type Props = {
  children: ReactNode
}
