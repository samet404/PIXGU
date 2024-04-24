'use server'
// https://lucia-auth.com/guidebook/github-oauth/nextjs-app/#profile-page

import { GeistSans } from 'geist/font/sans'

import Pfp from './components/Pfp'
import Logout from './components/Logout'
import Username from './components/Username'
import { api } from '@/trpc/server'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const Account = async () => {
  const isLogged = await api.auth.isLogged.query()

  if (!isLogged)
    return (
      <ErrDisplay
        msg="UNAUTHORIZED"
        code={401}
        reason="You need to be logged in to access account settings"
        redirectTo="/login"
      />
    )

  const user = await api.auth.getUser.query()

  if (user)
    return (
      <section className="flex h-full w-full animate-fade flex-col gap-6 p-1">
        <h1
          className={`${GeistSans.className} w-full rounded-md bg-slate-300 p-2 font-[900]`}
        >
          Account Settings
        </h1>

        <div className="flex flex-col gap-2">
          <Pfp profilePicture={user.profilePicture} />
          <Username username={user.username} />
          <Logout />
        </div>
      </section>
    )
}

export default Account
