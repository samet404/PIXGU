import { faServer } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import InputContainer from './components/InputContainer'

export const IsHostPlayer = () => {
  return (
    <div className="flex flex-col justify-between rounded-md bg-gradient-to-r from-[#ffffff3b] to-[#ffffff2e] shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)]">
      <Header name="Are you player as host ?" icon={faServer} />
      <InputContainer />
    </div>
  )
}
