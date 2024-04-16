import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../../../atoms'
import Btn from './Btn'

const BtnNo = () => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom)

  return <Btn className="" text="No" onClick={() => setIsModalOpen(false)} />
}
export default BtnNo
