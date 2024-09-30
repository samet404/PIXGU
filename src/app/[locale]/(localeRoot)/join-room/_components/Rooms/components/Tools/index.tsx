import type { MutableRefObject } from 'react'
import { RefetchBtn } from './components/RefetchBtn'

export const Tools = ({ roomsRef }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <RefetchBtn roomsRef={roomsRef} />
    </div>
  )
}

type Props = {
  roomsRef: MutableRefObject<{
    refetch: () => void
  } | null>
}
