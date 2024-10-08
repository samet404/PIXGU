'use client'

import { useAtomValue } from 'jotai'
import { isPublicAtom } from '../atoms'

export const IsPublic = () => {
  const isPublic = useAtomValue(isPublicAtom)

  return (
    <div className="flex flex-row flex-wrap rounded-md bg-[#0000001f] px-2 py-1 text-sm">
      {isPublic ? (
        <div className="text-green-200">Public</div>
      ) : (
        <div className="text-rose-200">Private</div>
      )}
    </div>
  )
}
