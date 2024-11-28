import MainButton from './MainButton'
import Image from 'next/image'
import createroom from '@/png/createroom.png'
import { getIsLogged } from '@/context/server'

const CreateRoom = ({ name, description }: Props) => {
  const isLogged = getIsLogged()

  return (
    <MainButton
      link="/create"
      icon={
        <Image
          className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
          src={createroom}
          alt="createroom"
        />
      }
      name={name}
      description={description}
      disabled={!isLogged}
      keyName="2"
      className="hover:from-[rgb(167,158,60)] hover:to-[rgba(255,255,255,0.3)]"
    />
  )
}

export default CreateRoom

type Props = {
  name: string
  description: string
}
