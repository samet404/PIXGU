'use client'

import { useSetAtom } from 'jotai'
import A from './A'
import B from './B'
import { setSearchParamsAtom } from '../atoms'
import { useEffect, useRef } from 'react'
import { useIntersection } from '@mantine/hooks'

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

  const containerRef = useRef<HTMLDivElement>(null)
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  })
  console.log('entry:', entry)

  return (
    <div
      className="flex h-[40rem] w-full items-center justify-center border-[0.1rem] border-yellow-300"
      ref={containerRef}
    >
      <div ref={ref}>{entry?.isIntersecting ? 'O_O' : ':)'}</div>
    </div>
  )
}
export default Client
