import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../../../atoms'
import { Btn } from './Btn'

export const Back = ({ text }: Props) => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom)

  return (
    <Btn
      className="bg-emerald-300"
      text={text}
      onMouseDown={() => setIsModalOpen(false)}
    />
  )
}

type Props = {
  text: string
}