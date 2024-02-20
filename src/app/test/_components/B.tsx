'use client'

import { useAtomValue } from 'jotai'
import { readSearchParamsAtom } from '../atoms'

const B = () => {
  const searchParams = useAtomValue(readSearchParamsAtom)

  console.log(searchParams)
  return <div></div>
}
export default B
