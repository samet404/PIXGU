import { useAtom } from 'jotai'
import { textAtom } from '../atoms'
import { useTimeout } from 'usehooks-ts'

const Test = () => {
  const [text, setText] = useAtom(textAtom)

  useTimeout(() => setText('cjsadjopoadspj'), 5000)
  
  return <div>Test</div>
  
}

export default Test
