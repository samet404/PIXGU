import { faKey } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import InputContainer from './components/InputContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Password = () => {
  return (
    <div className="flex flex-col justify-between rounded-md bg-gradient-to-r from-[#ffffff3b] to-[#ffffff2e] shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)]">
      <Header
        name="Password"
        icon={
          <FontAwesomeIcon
            icon={faKey}
            className="text-[1.5rem] drop-shadow-md"
            fontSize={25}
          />
        }
      />
      <InputContainer />
    </div>
  )
}

export default Password
