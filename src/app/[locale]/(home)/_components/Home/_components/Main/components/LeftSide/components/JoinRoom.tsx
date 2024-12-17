import magnify from '@/png/magnifiy.png'
import Image from 'next/image'
import MainButton from './MainButton'

const JoinRoom = ({ name, description }: Props) => {

  return (
    <MainButton
      link="/join"
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
      className="rounded-tr-md hover:from-[rgba(254,51,180,0.55)] hover:to-[rgba(255,255,255,0.3)]"
    />
  )
}

export default JoinRoom

type Props = {
  name: string
  description: string
}
