'use client'

import { useAtom, useAtomValue } from 'jotai'
import { getSplitedCutsceneStageTextAtom } from '../../atoms'
import { Fragment, type ReactNode, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { Interweave } from 'interweave'
import { polyfill } from 'interweave-ssr'
import TextInput from './components/TextInput'
import { resultTextAtom } from './atoms'

polyfill()

const inter400 = Inter({
  subsets: ['latin'],
  weight: ['400'],
})

const TextSection = () => {
  console.log('Text section rendered')

  const transformText = (node: HTMLElement): ReactNode => {
    switch (node.tagName.toLowerCase()) {
      case 'textinput':
        return <TextInput name={node.getAttribute('name')} />
    }
  }
  const splitedText = useAtomValue(getSplitedCutsceneStageTextAtom)
  const [resultText, setResultText] = useAtom(resultTextAtom)

  useEffect(() => {
    setResultText('')
    let count = 0
    console.log(splitedText![count])
    const intervalID = setInterval(() => {
      if (splitedText![count] !== undefined) {
        setResultText((prev) => prev + splitedText![count])
        count += 1
      }
    }, 50)

    return () => {
      clearInterval(intervalID)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [splitedText])

  if (splitedText)
    return (
      <section
        className={`${inter400.className} max-w-[90%] bg-[rgba(255,255,255,0.2)] p-2 text-sm text-[rgba(255,255,255,0.6)]`}
      >
        <Interweave
          tagName="div"
          content={resultText}
          transform={transformText}
        />
      </section>
    )
  else return <Fragment></Fragment>
}

export default TextSection
