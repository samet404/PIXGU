import Image from 'next/image'
import pfp from '@/png/pfp2.png'
import { getUserByName } from '../../lib/data'

import { GeistSans } from 'geist/font'

const User = async ({ params }: { params: { name: string } }) => {
  const user = await getUserByName(params.name)

  return (
    <div
      style={{
        backgroundColor: 'rgb(19, 78, 74)',
        backgroundImage:
          'radial-gradient(at 50% 0%, rgb(14, 116, 144) 0, transparent 99%)',
      }}
      className="h-full w-full 
      "
    >
      {user ? (
        <main className="flex h-full w-full animate-fade-down flex-col items-center pt-6 animate-duration-1000">
          <Image
            src={pfp}
            alt="pfp"
            placeholder="blur"
            className="h-20 w-20 select-none rounded-full border-4 border-[rgba(255,255,255,0.5)] object-cover shadow-[0_0px_20px_0px_rgba(0,0,0,0.7)] "
          ></Image>
          <div
            className={`${GeistSans.className} pt-5 text-5xl font-[900] text-[rgba(255,255,255,0.8)] drop-shadow-[0_0px_5px_rgba(0,0,0,0.7)] selection:bg-cyan-950`}
          >
            {user.name}
          </div>
          <div className="pt-20">
            <div className="flex flex-row items-center rounded-md bg-[rgba(255,255,255,0.5)] p-3 drop-shadow-[0_0px_2px_#ffea00]">
              başarımlar falan
            </div>
          </div>
        </main>
      ) : (
        <main className="flex h-full w-full animate-fade-down flex-col items-center justify-center pt-6 animate-duration-1000">
          <div
            className={`${GeistSans.className} pt-5 text-5xl font-[900] text-[rgba(255,255,255,0.8)] drop-shadow-[0_0px_5px_rgba(0,0,0,0.7)] selection:bg-cyan-950`}
          >
            USER NOT FOUND
          </div>
        </main>
      )}
    </div>
  )
}
export default User
