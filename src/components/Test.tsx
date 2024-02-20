'use client'

import { useAtomValue } from 'jotai'
import { historyStateAtom } from './atoms'
import { useInterval } from 'usehooks-ts'
import { useRef } from 'react'

const Test = () => {
  const historyState = useAtomValue(historyStateAtom)
  let count = useRef(0)

  useInterval(() => history.replaceState({ a: 123 }, '', '?a=123'), 1000)

  return <>{historyState?.count ? historyState.count : null}</>
}

export default Test
