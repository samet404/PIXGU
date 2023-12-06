'use client'

import { useAtomValue } from 'jotai'
import { cutsceneTextValueAtom } from '../../../atoms'

const TextDisplay = () => {
  const text = useAtomValue(cutsceneTextValueAtom)
  console.log('Text section rendered')

  return <div>{text}</div>
}

export default TextDisplay
