'use client'

import { useAtom, useSetAtom } from 'jotai'
import { useInterval } from 'usehooks-ts'
import { setSearchParamsAtom } from '../atoms'
import { replaceState } from '@/utils/replaceState'

const A = () => {
  const setSearchParams = useSetAtom(setSearchParamsAtom)
  let count = 0

  useInterval(() => {
    replaceState(`?a=${count}`, () => setSearchParams())
    count++
  }, 1000)
  
  return <div>{}</div>
}
export default A
