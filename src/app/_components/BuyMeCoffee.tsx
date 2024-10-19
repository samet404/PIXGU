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
      className={`${ubuntu.className} group absolute bottom-2 left-2 z-[99] flex animate-fade flex-row items-center rounded-full bg-gradient-to-r from-[#fcdf24] to-[#fff200] to-[50%] drop-shadow-[0_0px_6px_#fcdf23c3] backdrop-blur-lg`}
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
        {`Game is developing by one person and survives on your donations. I'd appreciate a coffee :3`}
      </div>
    </div>
  )
}
