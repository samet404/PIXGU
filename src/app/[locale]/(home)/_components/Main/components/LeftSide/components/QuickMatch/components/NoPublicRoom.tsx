import { useAtomValue } from 'jotai'
import { isThereAreRoomAtom } from '../atoms'
import { useEffect, useRef, useState } from 'react'
import { clsxMerge } from '@/utils/clsxMerge'

export const NoPublicRoom = () => {
  const isThereAreRoom = useAtomValue(isThereAreRoomAtom)
  const [hidden, setHidden] = useState<boolean>(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setHidden(isThereAreRoom)

    timeoutRef.current = setTimeout(() => setHidden(true), 10000)
  }, [isThereAreRoom])

  return (
    <div
      className={clsxMerge(
        `pointer-events-none absolute left-0 top-0  ${!isThereAreRoom && !hidden ? 'animate-fade-blur' : 'hidden animate-hide'}  h-full w-full animate-fade-blur backdrop-blur-lg`,
      )}
    >
      <div className="flex h-full w-full items-center justify-center p-2 text-center font-[500] text-[#ffffffa4]">
        There is no public room right now. Click to try again. Or just create
        one.
      </div>
    </div>
  )
}
