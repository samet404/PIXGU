import type { MutableRefObject } from 'react'
import { RefetchBtn } from './components/RefetchBtn'

export const Tools = ({ roomsRef, refreshText }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <RefetchBtn roomsRef={roomsRef} refreshText={refreshText} />
    </div>
  )
}

type Props = {
  refreshText: string
  roomsRef: MutableRefObject<{
    refetch: () => void
  } | null>
}
