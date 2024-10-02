'use client'

import { useSetAtom } from 'jotai'
import { switchModalAtom } from '../atoms'

export const Btn = () => {
  const switchModal = useSetAtom(switchModalAtom)
  return (
    <button
      onMouseDown={() => switchModal()}
      className="w-full rounded-b-md bg-[#ffffff8a] p-2 text-[#00000081]"
    >
      Open menu
    </button>
  )
}
