import { api } from '@/src/trpc/server'
import Image from 'next/image'
import Link from 'next/link'

const UserProfile = async () => {
  const session = await api.user.getSession.query()

  return session?.user ? (
    <Link
      href={`/user/${session.user.usernameWithUsernameID}`}
      className="h-12 w-12 rounded-full border-[0.3rem] border-[white] drop-shadow-[0_0px_3px_rgba(0,0,0,0.2)] duration-100 hover:opacity-60"
    >
      <Image
        src={session.user.profilePicture}
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
