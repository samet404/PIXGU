'use client'

import { useAtomValue } from 'jotai'
import { searchParamColorAtom } from '../atoms'

const B = () => {
  const searchParamColor = useAtomValue(searchParamColorAtom)
  console.log('B rendered')

  return <div>{searchParamColor}</div>
}
export default B
