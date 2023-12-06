'use client'

import React, { useEffect } from 'react'
import {
  countAtom,
  textAtom,
  writeonlyAddCountAtom,
  writeonlyUppercaseAtom,
} from './atoms'
import { useAtom, useSetAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { useEffectOnce, useTimeout } from 'usehooks-ts'
import Test from './components/Test'

const JotaiWithoutSSR = () => {
  console.log('JotaiWithoutSSR Rendered')
  const [text] = useAtom(textAtom)
  const writeonlyUppercase = useSetAtom(writeonlyUppercaseAtom)


  useEffectOnce(() => writeonlyUppercase())

  return (
    <>
      <div className="flex w-full justify-center p-1" >{text}</div>
      <Test />
    </>
  )
}

export default JotaiWithoutSSR
