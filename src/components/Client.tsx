'use client'

import { useOnReplaceStateUpdated } from '@/hooks/useOnReplaceStateUpdated'
import { useSetAtom } from 'jotai'
import { historyStateAtom } from './atoms'
import { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'

const Client = () => {
  const setHistoryState = useSetAtom(historyStateAtom)
  const [a, setA] = useState(0)
  let test: any

  useOnReplaceStateUpdated(() => {
    console.log(history.state)
    setA(prev => prev + 1)
    console.log(a)
  })

  useEffect(() => {
    history.replaceState({ a: 'dadw' }, '', '?da=2')
  }, [])

  return <>{a}</>
}

export default Client
