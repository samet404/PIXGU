'use client'

import { useSetAtom } from 'jotai'
import { useInterval } from 'usehooks-ts'
import { setSearchParamColorAtom } from '../atoms'
import { useRef } from 'react'

const A = () => {
  console.log('A rendered')
  const count = useRef(0)
  const setSearchParamColor = useSetAtom(setSearchParamColorAtom)

  useInterval(() => {
    setSearchParamColor(count.current.toString())
    count.current++
  }, 1000)

  return <div>{}</div>
}
export default A
