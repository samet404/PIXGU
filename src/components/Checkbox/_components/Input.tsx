'use client'

import { useRerenderWhenDomLoaded } from '@/hooks/useRerenderWhenDomLoaded'
import { type WritableAtom, useAtom } from 'jotai'
import { type ComponentProps, type ChangeEvent } from 'react'

const Input = ({ atom, ...props }: Props) => {
  const domReady = useRerenderWhenDomLoaded()
  const [atomVal, setAtomVal] = useAtom(atom)

  return (
    <input
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setAtomVal(e.target.checked)
      }}
      checked={atomVal ?? false}
      type="checkbox"
      className="peer/checkbox"
      {...props}
    />
  )
}

export default Input

type Props = {
  atom: WritableAtom<boolean | null, any, void>
} & ComponentProps<'input'>
