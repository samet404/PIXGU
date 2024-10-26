import { useSetAtom } from 'jotai'
import { switchModalAtom } from '../../../../atoms'

export const CloseBtn = () => {
  const switchModal = useSetAtom(switchModalAtom)
  return (
    <button onMouseDown={() => switchModal()} className="text-white  absolute right-2 top-2">
      Close
    </button>
  )
}
