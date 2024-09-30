'use client'

import { useAtomValue } from 'jotai'
import { inputInfoTextAtom } from '../atoms'

export const Info = () => {
  const text = useAtomValue(inputInfoTextAtom)

  if (text)
    return (
      <div className="pl-2 text-sm text-[rgba(255,255,255,0.5)]">{text}</div>
    )
}
