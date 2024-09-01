import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../atoms'

export const Modal = () => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom)

  return (
    <div
      className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[#0000005a] text-white backdrop-blur-lg"
      onClick={() => {
        console.log('clicked')
        setIsModalOpen(false)
      }}
    >
      Dont use firefox
    </div>
  )
}
