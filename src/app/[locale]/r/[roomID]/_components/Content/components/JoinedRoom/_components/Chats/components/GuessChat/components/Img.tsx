import { useBrokenUserPfps } from '@/zustand/store'
import Image from 'next/image'
import { useState } from 'react'

export const Img = ({ userID, pfp }: Props) => {
  const [hasError, sethasError] = useState<boolean>(false)
  const isPfpBroken = useBrokenUserPfps((state) => state.isBroken)

  if (hasError) useBrokenUserPfps.getState().add(userID)

  if ((pfp && isPfpBroken(userID)) || hasError || !pfp)
    return (
      <div className="flex-shrink-1 flex size-8 rounded-full bg-white"></div>
    )

  if (pfp && !hasError) {
    return (
      <Image
        src={pfp}
        width={32}
        height={32}
        onError={() => sethasError(true)}
        alt="pfp"
        className="flex size-6 flex-shrink-0 rounded-full bg-white"
      />
    )
  }
}

type Props = {
  userID: string
  pfp: string | null | undefined
}
