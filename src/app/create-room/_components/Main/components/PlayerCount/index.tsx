import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import NumberInputContainer from './components/NumberInputContainer'
import Header from '../Header'

const PlayerCount = ({ name, info }: { name: string; info: string }) => {
  return (
    <div className="flex flex-col justify-between rounded-md bg-gradient-to-r from-[#ffffff3b] to-[#ffffff2e] shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)]">
      <Header icon={faUserGroup} name={name} />
      <div className="flex flex-row gap-2 p-2">
        <NumberInputContainer maxInputValue={16} minInputValue={2} />
      </div>
      <div className="flex w-full flex-row items-center   gap-2 break-words rounded-b-md bg-[#ffff0015] p-2 text-sm text-[#ffff0089]">
        <FontAwesomeIcon icon={faInfoCircle} fontSize={25} />
        <span>{info}</span>
      </div>
    </div>
  )
}

export default PlayerCount
