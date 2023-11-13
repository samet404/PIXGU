import Image from 'next/image'
import Logo from '@/png/logo.png'
import { GeistMono } from 'geist/font'

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="z-10 h-4   animate-duration-1000 bg-blue-400 shadow-[0_0px_40px_0px_#000000e6] animate-loadingBar"></div>
      <div
        className="z-0 flex flex-row gap-10 grow items-center justify-center"
        style={{
          backgroundColor: 'hsla(0,100%,50%,1)',
          backgroundImage: 'radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%);',
        }}
      >
        <Image
          src={Logo}
          alt="Logo"
          className="h-[8rem] w-[8rem] drop-shadow-[0_0px_10px_rgba(0,0,0,0.5)]"
        />

        <div className='w-1 h-[8rem]  drop-shadow-[0_0px_10px_rgba(0,0,0,0.5)] rounded-sm bg-[rgba(255,255,255,0.5)]'></div>

        <div className={`${GeistMono.className}  drop-shadow-[0_0px_5px_rgba(0,0,0,0.5)] font-[900] text-white text-2xl`}>
            Thanks for waiting {'<3'}
        </div>
      </div>
    </div>
  )
}
export default Loading
