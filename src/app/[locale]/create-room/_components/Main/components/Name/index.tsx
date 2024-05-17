import Header from '../Header'
import Image from 'next/image'
import textImg from '@/svg/text-aa-bold-svgrepo-com.svg'
import InputContainer from './components/InputContainer'

const Name = () => {
  return (
    <div className="flex flex-col justify-between rounded-md bg-gradient-to-r from-[#ffffff3b] to-[#ffffff2e] shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)]">
      <Header
        name="Room Name"
        icon={
          <Image src={textImg} alt="textImg" className="w-8 drop-shadow-md" />
        }
      />
      <InputContainer />
    </div>
  )
}

export default Name
