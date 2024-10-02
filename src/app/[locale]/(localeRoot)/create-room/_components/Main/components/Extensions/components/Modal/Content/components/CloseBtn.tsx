import { useSetAtom } from 'jotai'
import { switchModalAtom } from '../../../../atoms'

export const CloseBtn = () => {
  const switchModal = useSetAtom(switchModalAtom)
  return (
    <button onMouseDown={() => switchModal()} className="absolute right-0">
      X
    </button>
  )
}
