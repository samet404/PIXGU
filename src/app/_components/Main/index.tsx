import Image from 'next/image'
import MainButton from './components/MainButton'
import login from '@/png/login.png'
import questionmark from '@/png/questionmark.png'
import play from '@/png/play.png'
import createroom from '@/png/createroom.png'

const Main = () => {
  return (
    <main
    className=" h-min-[20rem] animate-[position_15s_ease-in-out_infinite] rounded-md   bg-gradient-to-tl from-[rgb(189,255,185)] via-[rgb(184,244,255)] to-[rgb(242,255,187)]  p-2"
  >
    <div className="grid h-full w-full gap-2 rounded-md bg-[rgba(0,0,0,0.7)] p-2 xs:grid-cols-1 md:grid-cols-2 md:grid-rows-2 ">
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
        keyName='1'
        className="hover:from-[rgba(55,255,188,0.4)] hover:to-[rgba(255,255,255,0.3)]"
      />

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
        keyName='2'
        className="hover:from-[rgba(255,238,53,0.4)] hover:to-[rgba(255,255,255,0.3)]"
      />

      <MainButton
        link="/how-to-play"
        icon={
          <Image
            className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
            src={questionmark}
            alt="questionmark"
          />
        }
        name="Nasıl oynanır?"
        description="Nasıl oynayacağını bilmiyor musun? Hemen öğren!"
        keyName='3'
        className="hover:from-[rgba(53,228,255,0.4)] hover:to-[rgba(255,255,255,0.3)]"
      />

      <MainButton
        link="/login"
        icon={
          <Image
            className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
            src={login}
            alt="login"
          />
        }
        name="Giriş yap"
        description="Hızlı bir şekilde giriş yapın ve devam edin."
        keyName='4'
        className="hover:from-[rgba(59,164,255,0.4)] hover:to-[rgba(255,255,255,0.3)]"
      />
    </div>
  </main>
  )
}

export default Main