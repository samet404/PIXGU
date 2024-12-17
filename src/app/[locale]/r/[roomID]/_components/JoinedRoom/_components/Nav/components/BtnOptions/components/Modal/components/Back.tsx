import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../../../atoms'
import { Btn } from './Btn'

export const Back = () => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom)

  return (
    <Btn
      className="bg-emerald-300"
      text="BACK"
      onMouseDown={() => setIsModalOpen(false)}
    />
  )
}
