import MainButton from './MainButton'
import Image from 'next/image'
import createroom from '@/png/createroom.png'

const CreateRoom = () => {
  return (
    <MainButton
      link="/create-room"
      icon={
        <Image
          className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
          src={createroom}
          alt="createroom"
        />
      }
      name="Oda oluştur"
      description="Oda oluştur ve arkadaşlarını davet et!"
      keyName="2"
      className="hover:from-[rgba(255,238,53,0.4)] hover:to-[rgba(255,255,255,0.3)]"
    />
  )
}

export default CreateRoom
