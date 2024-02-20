'use client'

import { useSetAtom } from 'jotai'
import A from './A'
import B from './B'
import { setSearchParamsAtom } from '../atoms'
import { useEffect, useRef } from 'react'

const Client = () => {
  const setSearchParams = useSetAtom(setSearchParamsAtom)
  const didMount = useRef<boolean | null>(null)

  useEffect(() => {
    if (!didMount.current) {
      setSearchParams()
      didMount.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col">
      <A />
      <B />
    </div>
  )
}
export default Client
