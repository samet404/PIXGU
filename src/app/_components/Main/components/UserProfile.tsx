import { api } from '@/trpc/server'
import Image from 'next/image'
import Link from 'next/link'

const UserProfile = async () => {
  const user = await api.auth.getUser.query()
  console.log(user)

  const profilePicture = user?.profilePicture
  const usernameWithUsernameID = user?.usernameWithUsernameID

  if (!user) return null
  if (!profilePicture) return null

  return (
    <Link
      href={`/u/${usernameWithUsernameID}`}
      className="h-12 w-12 rounded-full border-[0.3rem] border-[white] drop-shadow-[0_0px_3px_rgba(0,0,0,0.2)] duration-100 hover:opacity-60"
    >
      <Image
        src={profilePicture}
        alt="Profile picture"
        width={66}
        height={66}
        sizes="(min-width: 2620px) calc(0.26vw + 54px), (min-width: 1840px) calc(0.39vw + 46px), (min-width: 1020px) calc(0.5vw + 41px), 37px"
        className="select-none rounded-full bg-gray-400"
      />
    </Link>
  )
}

export default UserProfile
