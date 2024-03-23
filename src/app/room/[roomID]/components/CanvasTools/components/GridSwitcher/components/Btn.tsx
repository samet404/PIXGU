'use client'

import { isGridOpenAtom } from '@/src/app/room/[roomID]/atoms'
import { useAtom } from 'jotai'

const Btn = () => {
  const [isOpen, setIsOpen] = useAtom(isGridOpenAtom)
  return (
    <button className="text-gray-600" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? 'Enabled' : 'Disabled'}
    </button>
  )
}
export default Btn
