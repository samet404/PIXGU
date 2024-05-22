import magnify from '@/png/magnifiy.png'
import Image from 'next/image'
import MainButton from './MainButton'
import { getIsLogged } from '@/context/server'

const JoinRoom = ({ name, description }: Props) => {
  const isLogged = getIsLogged()

  return (
    <MainButton
      link="/join-room"
      icon={
        <Image
          src={magnify}
          alt="play"
          className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
          sizes="sad"
        />
      }
      name={name}
      description={description}
      keyName="1"
      disabled={!isLogged}
      roundedClass="rounded-tr-md"
      className="hover:from-[#4f8e4c] hover:to-[rgba(255,255,255,0.3)]"
    />
  )
}

export default JoinRoom

type Props = {
  name: string
  description: string
}
