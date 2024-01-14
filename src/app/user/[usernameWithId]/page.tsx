import Image from 'next/image'
import pfp from '@/png/pfp2.png'
import { GeistSans } from 'geist/font/sans'

import { user } from '@/src/server/db/schema/auth'
import { db } from '@/src/server/db'
import { and, eq } from 'drizzle-orm'
import { useTimeout } from 'usehooks-ts'

const User = async ({ params }: { params: { usernameWithId: string } }) => {
  console.log(params.usernameWithId)
  const username = params.usernameWithId.split('%40')[0]
  const usernameId = (() => {
    const usernameId = params.usernameWithId.split('%40')[1]

    if (!usernameId) return null
    return parseInt(usernameId)
  })()

  const userResult = await db.query.user.findFirst({
    where: and(eq(user.username, username!), eq(user.usernameId, usernameId!)),
  })
  console.log(params.usernameWithId)

  if (!userResult)
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
        <main className="flex h-full w-full animate-fade flex-col items-center justify-center pt-6 animate-duration-1000">
          <div
            className={`${GeistSans.className} pt-5 text-3xl font-[900] text-[rgba(255,255,255,0.8)] drop-shadow-[0_0px_5px_rgba(0,0,0,0.7)] selection:bg-cyan-950`}
          >
            USER NOT FOUND
          </div>
        </main>
      </div>
    )

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
      <main className="flex h-full w-full animate-fade-down flex-col items-center pt-6 animate-duration-1000">
        <Image
          src={pfp}
          alt="pfp"
          placeholder="blur"
          className="h-20 w-20 select-none rounded-full border-4 border-[rgba(255,255,255,0.5)] object-cover shadow-[0_0px_20px_0px_rgba(0,0,0,0.7)] "
        ></Image>
        <div
          className={`${GeistSans.className} max-w-[90%] pt-5 text-center text-3xl font-[900] text-[rgba(255,255,255,0.8)] drop-shadow-[0_0px_5px_rgba(0,0,0,0.7)] selection:bg-cyan-950`}
        >
          {username}
        </div>
        <div className="pt-20">
          <div className="flex flex-row items-center rounded-md bg-[rgba(255,255,255,0.5)] p-3 drop-shadow-[0_0px_2px_#ffea00]">
            başarımlar falan
          </div>
        </div>
      </main>
    </div>
  )
}
export default User
