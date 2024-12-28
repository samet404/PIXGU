import { UserPfp } from '@/components/UserPfp'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

export const Pfp = ({ ID, profilePicture, changePfpText }: Props) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="size-20">
        <UserPfp
          ID={ID}
          src={profilePicture}
          alt="Profile picture"
          width={66}
          height={66}
          sizes="(min-width: 2620px) calc(0.26vw + 54px), (min-width: 1840px) calc(0.39vw + 46px), (min-width: 1020px) calc(0.5vw + 41px), 37px"
          className="h-full w-full select-none rounded-full bg-gray-400"
        />
      </div>

      <div
        className={`${inter.className} flex flex-row items-center gap-2 text-[rgba(0,0,0,0.5)]`}
      >
        <button className="rounded-lg bg-[rgba(255,255,255,0.5)] p-2 font-[500] shadow-[0_5px_10px_-5px_rgba(0,0,0,0.25)] outline-white">
          {changePfpText}
        </button>
      </div>
    </div>
  )
}

type Props = {
  ID: string
  profilePicture: string | null | undefined
  changePfpText: string
}
