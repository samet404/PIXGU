import Image from 'next/image'
import { GeistSans } from 'geist/font/sans'
import { api } from '@/trpc/server'
import { notFound } from 'next/navigation'
import pfp2 from '@/png/pfp2.png'

type UserPageProps = {
  params: { ID: string }
}

const User = async ({ params }: UserPageProps) => {
  const usernameWithUsernameID = params.ID
  const splitedUsernameWithUsernameID = usernameWithUsernameID.split('%40')

  const username = splitedUsernameWithUsernameID[0]
  const usernameID = splitedUsernameWithUsernameID[1]

  if (!username) return notFound()
  if (!usernameID) return notFound()

  const user = await api.user.getByUsernameWithUsernameID.query({
    username: username,
    usernameID: usernameID,
  })

  if (user.length == 0) return notFound()

  if (user[0])
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
            width={100}
            height={100}
            src={user[0].profilePicture ? user[0].profilePicture : pfp2}
            alt="pfp"
            className="h-20 w-20 select-none rounded-full border-4 border-[rgba(255,255,255,0.5)] object-cover shadow-[0_0px_20px_0px_rgba(0,0,0,0.7)] "
          ></Image>
          <div
            className={`${GeistSans.className} max-w-[90%] pt-5 text-center text-3xl font-[900] text-[rgba(255,255,255,0.8)] drop-shadow-[0_0px_5px_rgba(0,0,0,0.7)] selection:bg-cyan-950`}
          >
            {user[0].username}
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
