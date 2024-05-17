'use client'

import PassBox from './components/PassBox'
import { Fragment, type ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import { isPassTrueAtom } from './atoms'

const JoinWithPass = ({ children }: Props) => {
  const isPassTrue = useAtomValue(isPassTrueAtom)

  return (
    <Fragment>
      {!isPassTrue ? <PassBox /> : null}
      {isPassTrue ? children : null}
    </Fragment>
  )
}

export default JoinWithPass

type Props = {
  children: ReactNode
}
