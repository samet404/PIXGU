import { faKey } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import Input from './components/Input'
import { IsPublic } from './components/IsPublic'
import { Info } from './components/Info'

const Password = () => {
  return (
    <div className="flex flex-col justify-between rounded-md bg-gradient-to-r from-[#ffffff3b] to-[#ffffff2e] shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)]">
      <Header name="Password" icon={faKey} />
      <Input>
        <IsPublic />
        <Info />
      </Input>
    </div>
  )
}

export default Password
