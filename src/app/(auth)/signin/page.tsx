// image
import Image from 'next/image'
import bgImg from '@/jpg/daniele-levis-pelusi-unsplash.jpg'
import Logo from '@/png/logo.png'
// component
import OAuthSection from './components/OAuthSection'
import NavigationSection from './components/OAuthSection/NavigationSection'

const Login = () => {
  return (
    <div className="flex h-full w-full flex-col items-center ">
      <Image
        src={bgImg}
        alt="background"
        className="absolute z-0 h-full w-full select-none object-cover brightness-[0.5]"
        placeholder="blur"
        sizes="100vw"
        quality={40}
      ></Image>

      <main className="flex h-full w-[20rem] animate-fade flex-col items-center gap-3 overflow-y-auto bg-[rgba(255,255,255,0.2)] px-2 pb-10 pt-2 shadow-[0_0px_80px_10px_rgba(0,0,0,0.8)] backdrop-blur-md animate-duration-[500ms]">
        <NavigationSection />
        <Image
          src={Logo}
          alt="logo"
          className=" h-[auto] w-[5rem] pb-6 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
          sizes="calc(1.96vw + 75px)"
        ></Image>
        <OAuthSection />
      </main>
    </div>
  )
}
export default Login
