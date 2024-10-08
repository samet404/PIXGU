import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../../../atoms'
import Btn from './Btn'

const BtnNo = () => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom)

  return (
    <Btn
      className="bg-emerald-300"
      text="BACK"
      onClick={() => setIsModalOpen(false)}
    />
  )
}
export default BtnNo
