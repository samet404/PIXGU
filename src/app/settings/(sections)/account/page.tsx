// https://lucia-auth.com/guidebook/github-oauth/nextjs-app/#profile-page

import { GeistSans } from 'geist/font/sans'
import { auth } from '@/auth/lucia'
import * as context from 'next/headers'
import { redirect } from 'next/navigation'

import Pfp from './components/Pfp'
import Logout from './components/Logout'
import Username from './components/Username'
import { api } from '@/src/trpc/server'

const Account = async () => {
  const session = api.user.getSession.query()
  
  if (!session) redirect('/login')
  return (
    <section className="flex h-full w-full animate-fade flex-col gap-6 p-1">
      <h1
        className={`${GeistSans.className} w-full rounded-md bg-slate-300 p-2 font-[900]`}
      >
        Account Settings
      </h1>

      <div className="flex flex-col gap-2">
        <Pfp profilePicture={session.user.profilePicture} />
        <Username username={session.user.username} />
        <Logout />
      </div>
    </section>
  )
}

export default Account
