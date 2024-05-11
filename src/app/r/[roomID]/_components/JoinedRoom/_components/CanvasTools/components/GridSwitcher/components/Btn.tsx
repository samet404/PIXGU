'use client'

import { isGridOpenAtom } from '@/app/room/[roomID]/atoms'
import { clsxMerge } from '@/utils/clsxMerge'
import { useAtom } from 'jotai'

const Btn = () => {
  const [isOpen, setIsOpen] = useAtom(isGridOpenAtom)
  return (
    <button
      className={clsxMerge('bg-[#ffffff46] text-gray-500', {
        'bg-[#ffffff91]': isOpen,
      })}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? 'Enabled' : 'Disabled'}
    </button>
  )
}
export default Btn
