import { api } from '@/src/trpc/server'
import Image from 'next/image'
import Link from 'next/link'

const UserProfile = async () => {
  const sessionWithUsernameId = await api.user.getSessionWithUsernameId.query()

  return sessionWithUsernameId ? (
    <Link
      href={`/user/${sessionWithUsernameId.session.user.username}@${
        sessionWithUsernameId.usernameId[0]!.usernameId
      }`}
      className="h-12 w-12 rounded-full border-[0.3rem] border-[white] drop-shadow-[0_0px_3px_rgba(0,0,0,0.2)] duration-100 hover:opacity-60"
    >
      <Image
        src={sessionWithUsernameId.session.user.profilePicture!}
        alt="Profile picture"
        width={66}
        height={66}
        sizes="sa"
        className="select-none rounded-full bg-gray-400"
      />
    </Link>
  ) : null
}

export default UserProfile