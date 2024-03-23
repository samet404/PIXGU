'use client'

import { useAtomValue } from 'jotai'
import { isGridOpenAtom } from '@/app/room/[roomID]/atoms'
import { clsxMerge } from '@/src/utils/clsxMerge'

const GridCanvas = () => {
  const isOpen = useAtomValue(isGridOpenAtom)

  return (
    <canvas
      id="grid-canvas"
      width={600}
      height={600}
      className={clsxMerge(
        'absolute bottom-0 left-0 right-0 top-0 z-20 inline-block rounded-lg',
        {
          hidden: !isOpen,
        },
      )}
    />
  )
}
export default GridCanvas
