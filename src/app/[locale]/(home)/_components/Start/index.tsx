import { Outfit } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import bg from '@/png/startbg.png'
// import { Navbar } from './components/Navbar'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '400', '500', '700'],
})

const Start = () => {
  return (
    <div
      style={{
        scrollbarWidth: 'none',
      }}
      className={`${outfit.className} h-full w-full flex-col gap-2 overflow-y-scroll`}
    >
      {/* <Navbar /> */}
      <div className=" relative flex w-full">
        <Image
          src={bg}
          alt="bg"
          sizes="200vw"
          placeholder="blur"
          className=" aspect-video w-full"
        />
        <div className="absolute bottom-0 left-0 flex h-full  w-full flex-col gap-4 items-center pt-12 ">

          <div className='text-white text-[1.2rem] drop-shadow-[0_0px_2px_rgba(0,0,0,0.3)]'>
            Start shape your imagination. Think fast, draw faster, win bigger.
          </div>

          <div className="hover:opacity-60 backdrop-blur-md">
            <Link
              href={'/login'}
              className=" animate-fade-up justify-center text-[2rem] font-[600] px-4 py-1 rounded-md shadow-[0_0px_30px_1px_rgba(0,0,0,0.2)] bg-[#00000029]  text-[#ffffffc3] duration-300 "
            >
              Play now
            </Link>
          </div>
        </div>
      </div>
      <main className="flex h-[40rem] w-full flex-col items-center justify-center bg-gradient-to-t from-[#000000] to-[#1f1f1f] text-white  xxs:text-[1.5rem] md:text-[3rem] lg:text-[4rem]">
        <div>{`ᓚ₍⑅^..^₎♡`}</div>
        <div className='text-sm w-[20rem]'>
          Hello, you found my secret spot. I am the developer of this game. I faced significant challenges while making this game alone. There are many things I want to add to the game. If you liked my game, I would be happy if you consider supporting me.
        </div>
      </main>
    </div>
  )
}

export default Start
