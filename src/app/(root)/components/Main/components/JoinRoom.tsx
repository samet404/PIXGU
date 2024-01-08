import play from '@/png/play.png'
import Image from 'next/image'
import MainButton from './MainButton'

const JoinRoom = () => {
  return (
    <MainButton
      link="/join-room"
      icon={
        <Image
          src={play}
          alt="play"
          className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
        />
      }
      name="Odaya katıl"
      description="Odaya katıl ve oynamaya başla!"
      keyName="1"
      className="rounded-tl-md hover:from-[rgba(55,255,188,0.4)] hover:to-[rgba(255,255,255,0.3)]"
    />
  )
}

export default JoinRoom
