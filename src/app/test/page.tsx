import { atom } from '@zedux/react'

const Test = () => {
  const greetingAtom = atom('greeting', 'Hello World!')
  return <div></div>
}
export default Test
