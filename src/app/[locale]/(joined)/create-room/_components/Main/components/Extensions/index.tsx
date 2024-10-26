import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import { Btn } from './components/Btn'
import { Modal } from './components/Modal'

export const Extensions = () => {
  return (
    <div className="flex flex-col justify-between rounded-md bg-gradient-to-r from-[#ffffff3b] to-[#ffffff2e] shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)]">
      <Header name="Mods" icon={faPuzzlePiece} />
      <div>
        <Btn />
      </div>
      <Modal />
    </div>
  )
}
