import Image from 'next/image'
import Link from 'next/link'
import img from '@/png/buymecoffee.png'
import { Ubuntu } from 'next/font/google'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['700'],
})

export const BuyMeCoffee = () => {
  return (
    <div
      className={`${ubuntu.className} group absolute bottom-2 left-2 z-[99] flex animate-fade flex-row items-center rounded-full bg-gradient-to-r from-[#fcdf24] to-[#fff200] to-[50%] shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)] backdrop-blur-lg`}
    >
      <Link
        href="https://buymeacoffee.com/pixgu"
        target="_blank"
        prefetch={false}
        className="animate-fade rounded-full"
      >
        <Image
          src={img}
          className="size-10 rounded-full hover:opacity-70 hover:duration-300 group-hover:rotate-[-15deg]"
          alt="buy me a coffee"
        />
      </Link>

      <div className="hidden animate-fade pr-4 text-[0.7rem] text-black selection:!bg-black group-hover:flex">
        {`I have no money :( also you can disable in the settings`}
      </div>
    </div>
  )
}
