import { useAtomValue } from 'jotai'
import { inputInfoTextAtom } from '../atoms'

const InputInfo = () => {
  const text = useAtomValue(inputInfoTextAtom)

  return <div className="text-sm text-[rgba(255,255,255,0.5)]">{text}</div>
}

export default InputInfo
